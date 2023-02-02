const CronModel = require("../models/cron.js");
require('dotenv').config();


exports.parisAirQualityCheck = async (req, res) => {
  const latitude = 48.856613
  const longitude = 2.352222

  const response = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.IQAIR_API_KEY}`);

  var original_data = await response.json();
  var {ts, aqius, mainus, aqicn, maincn} = original_data.data.current.pollution

  await CronModel.save(ts, aqius, mainus, aqicn, maincn);

  console.log("Air quality for paris has been saved successfully");
}


exports.parisMostPollutedDate = async (req, res) => {
  var reply = await CronModel.read();
  var datetime = reply[0][reply[0].length - 1].datetime
  
  res.send({
    "Date": datetime.toISOString().slice(0, 10).replace('T', ' '),
    "Time": datetime.toISOString().slice(11, 19).replace('T', ' '),
  })
}

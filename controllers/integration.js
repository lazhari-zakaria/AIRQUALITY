require('dotenv').config();

exports.airQualityCheck = async (req, res) => {
  const {latitude, longitude} = req.params;
  const response = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.IQAIR_API_KEY}`);
  var original_data = await response.json();
  var custom_data = {
    "Result": {
      "Pollution": original_data.data.current.pollution
    }
  }
  res.json(custom_data);
};

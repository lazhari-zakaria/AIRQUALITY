//require modules
const express = require('express');
const cron = require('node-cron');
require('dotenv').config();


//start application
const app = express();
app.use(express.json());


//setup routes
const integrationRoutes = require("./routes/integration.js");
app.use("/airquality", integrationRoutes);

const cronRoutes = require("./routes/cron.js");
app.use("/mostpolluted", cronRoutes);


// cron job to check air quality for the Paris zone
var cronJob = require('./controllers/cron');

cron.schedule("* * * * *", function () {
  cronJob.parisAirQualityCheck();
});


//start the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on: http://127.0.0.1:${PORT}`)
);

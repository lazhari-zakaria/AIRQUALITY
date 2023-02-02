const express = require("express");
const { parisMostPollutedDate } = require("../controllers/cron.js");

const router = express.Router();

router.get("/paris", parisMostPollutedDate);

module.exports = router;
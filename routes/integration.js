const express = require("express");
const { airQualityCheck } = require("../controllers/integration.js");

const router = express.Router();

router.get("/:latitude/:longitude", airQualityCheck);

module.exports = router;
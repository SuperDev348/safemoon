const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/ass/market');

router.get('/', Controller.getMarket);

module.exports = router;

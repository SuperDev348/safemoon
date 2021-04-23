const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/hoge/market');

router.get('/', Controller.getMarket);

module.exports = router;
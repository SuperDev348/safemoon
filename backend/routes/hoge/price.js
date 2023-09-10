const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/hoge/price');

router.get('/', Controller.getPrice);

module.exports = router;

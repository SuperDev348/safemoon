const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/safemoon/price');

router.get('/', Controller.getPrice);
router.get('/history', Controller.getPrices);

module.exports = router;
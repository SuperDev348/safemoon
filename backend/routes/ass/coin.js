const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/ass/coin');

router.get('/', Controller.getAll);
router.get('/:Id', Controller.getByWalletId);
router.get('/day/:Id', Controller.getPerDay);

module.exports = router;
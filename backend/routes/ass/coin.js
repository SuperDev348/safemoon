const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/ass/coin');

router.get('/', Controller.getAll);
router.get('/:Id', Controller.getByWalletId);
router.get('/day/:Id', Controller.getPerDay);
router.delete('/:Id', Controller.deleteByWalletId);
router.post('/buy/', Controller.buy);
router.post('/sell/', Controller.sell);

module.exports = router;
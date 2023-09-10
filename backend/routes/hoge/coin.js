const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/hoge/coin');

router.get('/', Controller.getAll);
router.get('/:Id', Controller.getByWalletId);
router.get('/day/:Id', Controller.getPerDay);
router.put('/:Id', Controller.updateById);

module.exports = router;

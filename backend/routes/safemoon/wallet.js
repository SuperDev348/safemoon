const express = require('express');
const router = express.Router();
const Controller = require('../../app/api/controllers/safemoon/wallet');

router.post('/', Controller.create);

module.exports = router;
const express = require('express');
const router = express.Router();

router.post('/', Controller.create);

module.exports = router;
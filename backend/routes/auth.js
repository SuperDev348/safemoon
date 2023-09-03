const express = require('express');
const router = express.Router();
const UserController = require('../app/api/controllers/users');
router.post('/register', UserController.create);
module.exports = router;

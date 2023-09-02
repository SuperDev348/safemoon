const express = require('express');
const router = express.Router();
const UserController = require('../app/api/controllers/users');
router.post('/register', UserController.create);
router.get('/userlist', UserController.userlist);
router.get('/getall', UserController.getAll);
module.exports = router;

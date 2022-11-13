const express = require('express');
const router = express.Router();
const authlogin = require('../middlewares/authLoginUserMiddleware');
const UserController = require('../controllers/users.controller');
const userController = new UserController();

router.post('/signup', authlogin,userController.signup);
router.post('/login', authlogin,userController.login);


module.exports = router;
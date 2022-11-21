const express = require('express');
const router = express.Router();
const authlogin = require('../middlewares/authLoginUserMiddleware');
const auth = require('../middlewares/authMiddleware')
const UserController = require('../controllers/users.controller');
const userController = new UserController();

router.post('/signup', authlogin,userController.signup);
router.post('/login', authlogin,userController.login);
router.post('/emailcheck',userController.emailCheck);
router.post('/emailcheck/auth',userController.certification)
router.get('/myprofile',auth,userController.myprofile);
router.put('/nickname',auth,userController.updateNic)
router.put('/password',auth,userController.updatePw)
module.exports = router;
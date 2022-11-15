const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const GroupController = require('../controllers/group.controller')
const groupcontroller = new GroupController();

router.post('/groups',auth,groupcontroller.createGroup)

router.put('/groups/:groupId',auth,groupcontroller.updateGroupName)
router.put('/groups/:groupId',auth,groupcontroller.updateGroupImg)

router.get('/groups/:groupId',auth,groupcontroller.findAllGroup)
router.get('/groups',auth,groupcontroller.findOneGroup)

router.delete('/groups/:groupId',auth,groupcontroller.destroyGroup)

module.exports = router;
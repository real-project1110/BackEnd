const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const GroupController = require('../controllers/group.controller')
const groupcontroller = new GroupController();

router.post('/',auth,groupcontroller.createGroup)

router.put('/:groupId',auth,groupcontroller.updateGroupName)
router.put('/:groupId/groupImg',auth,groupcontroller.updateGroupImg)

router.get('/:groupId',auth,groupcontroller.findAllGroup)
router.get('/',auth,groupcontroller.findOneGroup)

router.delete('/:groupId',auth,groupcontroller.destroyGroup)

module.exports = router;
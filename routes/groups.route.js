const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const GroupController = require('../controllers/groups.controller');
const groupcontroller = new GroupController();

router.post('/', auth, groupcontroller.createGroup);

router.put('/:groupId', auth, groupcontroller.updateGroupName);
router.put('/:groupId/groupImg', auth, groupcontroller.updateGroupImg);
router.put('/:groupId/groupUserNickname', auth, groupcontroller.updateGroupNic);

router.get('/:groupId',auth,groupcontroller.findOneGroup)
router.get('/',auth,groupcontroller.findAllGroup)
router.get('/:groupId/profile',auth,groupcontroller.findGroupProfile)
router.get('/:groupUserId',auth,groupcontroller.findGroupUser)
router.get('/:groupId/groupUsers',auth,groupcontroller.findAllGroupUser)

router.delete('/:groupId', auth, groupcontroller.destroyGroup);

module.exports = router;

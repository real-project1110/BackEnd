const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
// const { get } = require('../middlewares/cacheMiddleware');
const upload = require('../middlewares/multerMiddleware');
const GroupController = require('../controllers/groups.controller');
const groupcontroller = new GroupController();

router.post('/', auth, groupcontroller.createGroup);
router.post('/:groupId/groupUser/status', auth, groupcontroller.postStatus);
router.post('/groupUsers', auth, groupcontroller.createGroupUser);

router.put('/:groupId', auth, groupcontroller.updateGroupName);
router.put(
  '/:groupId/groupImg',
  auth,
  upload.single('image'),
  groupcontroller.updateGroupImg,
);
router.put('/:groupId/groupUserNickname', auth, groupcontroller.updateGroupNic);
router.put('/:groupId/groupUser/status', auth, groupcontroller.changeStatus);
router.put(
  '/:groupId/groupAvatarImg',
  auth,
  upload.single('image'),
  groupcontroller.updatGroupAvatarImg,
);
router.get(
  '/',
  auth,
  //  get,
  groupcontroller.findAllGroupList,
);
router.get('/:groupId', auth, groupcontroller.findOneGroup);
router.get('/:groupId/profile', auth, groupcontroller.findGroupProfile);
router.get('/groupUsers/:groupUserId', auth, groupcontroller.findGroupUser);
router.get('/:groupId/groupUsers', auth, get, groupcontroller.findAllGroupUser);

router.delete('/:groupId/groupUser', auth, groupcontroller.deleteGroupUser);
router.delete('/:groupId', auth, groupcontroller.destroyGroup);
module.exports = router;

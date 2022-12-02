const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const RoomController = require('../controllers/room.controller');
const roomController = new RoomController();

//*roomId 가져오기 없으면 만듦
router.get('/groups/:groupId/room', auth, roomController.findRoomId);
//*채팅내역 불러오기
router.get('/room/:roomId', auth, roomController.getChat);
//*채팅내용 저장하기
router.post('/room/:roomId', auth, roomController.saveChat);

module.exports = router;

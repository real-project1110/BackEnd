const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authMiddleware')

const ChattingController = require('../controllers/chatting.controller')
const chattingController = new ChattingController()

router.post('/:groupId/room',auth,chattingController.createRoom)
router.post('/:roomId',auth,chattingController.createChat)

router.get('/:roomId',auth,chattingController.getChat)


module.exports = router
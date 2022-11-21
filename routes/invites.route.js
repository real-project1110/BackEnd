const express =require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const InviteController = require('../controllers/invites.controlloer')
const inviteController = new InviteController();

router.post('/:groupId',auth,inviteController.createInvite)

router.get('/',auth,inviteController.findInvite)

module.exports = router;
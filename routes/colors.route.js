const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const ColorController = require('../controllers/colors.controller');
const colorcontroller = new ColorController();

router.post('/:groupId',auth,colorcontroller.createColor)

router.put('/:groupId/:colorId',auth,colorcontroller.updateColor)

router.delete('/:groupId/:colorId',auth,colorcontroller.deleteColor)

router.get('/:groupId',auth,colorcontroller.getColor)

module.exports=router
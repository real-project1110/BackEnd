const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const ColorController = require('../controllers/colors.controller');
const colorcontroller = new ColorController();

router.post('/:groupId',colorcontroller.createColor)

router.put('/:groupId/:colorId',colorcontroller.updateColor)

router.delete('/:groupId/:colorId',colorcontroller.deleteColor)

router.get('/:groupId',colorcontroller.getColor)

module.exports=router
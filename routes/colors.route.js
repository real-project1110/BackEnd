const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const ColorController = require('../controllers/colors.controller');
const colorController = new ColorController();

router.post('/:groupId/color',auth, colorController.createColor);
router.get('/:groupId/color',auth, colorController.getColor)
router.put('/:groupId/color/:colorId',auth, colorController.updateColor)
router.delete('/color/:colorId',auth, colorController.deleteColor)
module.exports = router;
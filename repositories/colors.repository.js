const { Color } = require('../models');

class ColorRepository {
    createColor = async (color,status,groupId)=>{
        const createcolor= await Color.create({color,status,groupId})
        return createcolor
    }

    updateColor = async (color,status,groupId,colorId)=>{
        await Color.update({color,status},{where:{groupId,colorId}})
    }

    deleteColor = async (groupId,colorId)=>{
        await Color.destroy({where:{groupId,colorId}})
    }

    getColor = async (groupId)=>{
        const getcolor = await Color.findAll({where:{groupId}})
        return getcolor
    }
}

module.exports = ColorRepository;
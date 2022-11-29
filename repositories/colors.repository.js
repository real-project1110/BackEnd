const {Color,GroupUser} = require('../models');
const {Op} = require('sequelize')
class ColorRepository{
    createColor = async({groupId,color,content}) =>{
        const createColor = await Color.create({groupId,color,content})
        return createColor
    }

  // findGU = async(userId,groupId) =>{
  //     const findGU = await GroupUser.findOne({
  //         where: { [Op.and]: [{ userId }, { groupId }] }
  //     })
  //     console.log('222222222',findGU)
  //     return findGU
  // }

  getGroupId = async ({ userId, groupId }) => {
    const getGroupId = await GroupUser.findOne({ where: { groupId, userId } });
    return getGroupId;
  };

    findGroupId= async({groupId})=>{
        const findGroupId = await Color.findAll({
            where : {groupId},
            order : [['colorId','desc']],
        })
        return findGroupId 
    }

  // findUC = async(userId,colorId)=>{
  //     const findUC = await Color.findOne({
  //         where: { [Op.and]: [{ userId }, { colorId }, {groupId}] }
  //     })
  //     return findUC
  // }


    updateColor = async({colorId,groupId,color,content})=>{
        const updateColor = await Color.update(
            {color,content},
            {where: {colorId,groupId}}
        )
        return updateColor
    }
    
    deleteColor = async({colorId})=>{
        const deleteColor = await Color.destroy({where: {colorId}})
        return deleteColor
    }

}
module.exports = ColorRepository;

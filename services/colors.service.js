const { CloudFormation } = require('aws-sdk');
const ColorRepository = require('../repositories/colors.repository')

class ColorService {
    colorRepository = new ColorRepository();

    createColor = async(userId,groupId,color,status)=>{
        const getGroupId = await this.colorRepository.getGroupId(userId)
        // if(userId !==getGroupId.userId){
        //     throw new Error('유저 정보가 없습니다')
        // }
        if(!getGroupId){
            throw new Error('유저 정보가 없습니다')
        }
        if(getGroupId.groupId !==parseInt(groupId)){
            throw new Error('소속된 그룹이 아닙니다')
        }
        // console.log('11111111',groupId,getGroupId.groupId)
        // console.log('123123123123',userId)
        const createColor = await this.colorRepository.createColor(groupId,color,status)
        if(createColor.groupId !==groupId){
            throw new Error('권한이 없습니다')
        }
        console.log('111111',createColor.groupId,groupId)
        return {
            groupId: getGroupId.groupId,
            color : createColor.color,
            status : createColor.status
        }
    }
    getColor = async(groupId)=>{
        const getColor = await this.colorRepository.findGroupId(groupId)
        if(!getColor){
            throw new Error('유저 정보가 존재하지 않습니다')
        }
        const result = getColor.map((x)=>{
            return {
                colorId : x.colorId,
                groupId : x.groupId,
                color : x.color,
                status : x.status
            }
        })
        return result
    }

    updateColor = async(userId,groupId,colorId,color,status)=>{
        const getGroupId = await this.colorRepository.getGroupId(userId)
        if(!getGroupId){
            throw new Error('유저 정보가 없습니다')
        }
        const updateColor = await this.colorRepository.updateColor(groupId,colorId,color,status)
        return{
            color :updateColor.color,
            status : updateColor.status
        }
    }

    deleteColor = async(userId,colorId)=>{
        const getGroupId = await this.colorRepository.getGroupId(userId)
        if(!getGroupId){
            throw new Error('유저 정보가 없습니다')
        }
        
        const deleteColor = await this.colorRepository.deleteColor(colorId)
        if(!deleteColor){
            throw new Error('존재하지 않는 컬러입니다')
        }
        return deleteColor
    }
}


module.exports = ColorService;
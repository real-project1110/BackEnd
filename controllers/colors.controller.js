const ColorService = require('../services/colors.service');

class ColorController {
    colorService = new ColorService();

    createColor = async (req,res,next)=>{
        try{
            const {userId} = res.locals.user
            const {groupId} = req.params;
            const {color,status} = req.body;
            const createColor = await this.colorService.createColor(userId,groupId,color,status)
            res.status(201).json({data:createColor,message:"컬러가 생성되었습니다"})
        }catch(error){
            next(error);
        }        
    }

    getColor = async(req,res,next)=>{
        try{
            const {groupId} = req.params;
            const getColor = await this.colorService.getColor(groupId)
            res.status(200).json({data:getColor})
        }catch(error){
            next(error)
        }
    }

    updateColor = async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {groupId,colorId} = req.params;
            const {color,status} = req.body;
            const updateColor = await this.colorService.updateColor(userId,groupId,colorId,color,status)
            res.status(200).json({data:updateColor.groupId,message:"컬러 수정 완료"})
        }catch(error){
            next(error)
        }
    }

    deleteColor = async(req,res,next)=>{
        try{
            const{userId} = res.locals.user;
            const{colorId} = req.params;
            const deleteColor = await this.colorService.deleteColor(userId,colorId)
            res.status(200).json({data:deleteColor,message:"컬러 삭제 완료"})
        }catch(error){
            next(error)
        }
    }

}


module.exports = ColorController
const ColorService = require('../services/colors.service')

class ColorController {
    colorService = new ColorService()

    createColor = async(req,res,next)=>{
     try{
        const {color,status} = req.body
        const {groupId} = req.params
        const createcolor = await this.colorService.createColor(color,status,groupId)
        res.status(201).json({data:createcolor})
        }catch(err){
            next(err)
        }
    }


    updateColor = async(req,res,next)=>{
        try{
            const {color,status}=req.body
            const {groupId,colorId} = req.params
            const updatecolor = await this.colorService.updateColor(color,status,groupId,colorId)
            res.status(200).json({data:updatecolor})
        }catch (err) {
            next(err)
          }
    }

    deleteColor = async(req,res,next)=>{
        try{
            const {groupId,colorId} = req.params
            const deletecolor = await this.colorService.deleteColor(groupId,colorId)
            res.status(200).json({data:deletecolor})
        }catch (err) {
            next(err)
          }
    }


    getColor = async(req,res,next)=>{
        try{
            const {groupId} = req.params
            const getcolor = await this.colorService.getColor(groupId)
            res.status(200).json({data:getcolor})
        }catch (err) {
            next(err)
          }
    }
}

module.exports = ColorController;
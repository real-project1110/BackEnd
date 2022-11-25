const ColorRepository = require('../repositories/colors.repository')

class ColorService{
    colorRepository = new ColorRepository()

    createColor = async(color,status,groupId)=>{
        const createcolor = await this.colorRepository.createColor(color,status,groupId)
        return createcolor
    }

    updateColor = async(color,status,groupId,colorId)=>{
        await this.colorRepository.updateColor(color,status,groupId,colorId)
        return {message:"수정 완료"}
    }

    deleteColor = async(groupId,colorId)=>{
        await this.colorRepository.deleteColor(groupId,colorId)
        return {message:"삭제 완료"}
    }

    getColor = async(groupId)=>{
        const getcolor = await this.colorRepository.getColor(groupId)
        return getcolor
    }
}

module.exports=ColorService;
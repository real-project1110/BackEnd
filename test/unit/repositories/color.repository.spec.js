const ColorRepository = require('../../../repositories/colors.repository')

const {
    requestParams,
    requestParams2,
    requestBody,
    responseLocalsUser,
    data,
    data2,
    data3
    
} = require('../../fixtures/color.fixtures')

const mockColorModel= ()=>({
    
    create: jest.fn(),
    findOne: jest.fn(),
    findAll:jest.fn(),
    update:jest.fn(),
    destroy:jest.fn()
})


describe('color Test',()=>{
    let colorRepository= new ColorRepository()
    colorRepository.Color = mockColorModel()
    
    beforeEach(()=>{
        jest.resetAllMocks()
    })

    test('colorRepository Method createColor sucess case',async()=>{
        const {groupId,color,content} = data

        colorRepository.Color.create=jest.fn(()=>{
            return data
        })

        const colors = await colorRepository.createColor({groupId,color,content})

        expect(colorRepository.Color.create).toHaveBeenCalledTimes(1)

        expect(colors).toEqual({groupId,color,content})

    })



    test('colorRepository Method updateColor sucess case',async()=>{
        const {groupId, colorId, color, content} = data3
        
        colorRepository.Color.updateColor=jest.fn(()=>{
            return data
        })

        const colors = await colorRepository.updateColor({colorId,groupId,color,content})

        expect(colorRepository.Color.updateColor).toHaveBeenCalledTimes(1)

        expect(colors).toEqual({color,content})


    })


    
    test('colorRepository Method deleteColor sucess case',async()=>{
        const {colorId} = data3
        
        colorRepository.Color.deleteColor=jest.fn(()=>{
            return data3
        })

        await colorRepository.deleteColor({colorId})

        expect(colorRepository.Color.deleteColor).toHaveBeenCalledTimes(1)
    })

    
})
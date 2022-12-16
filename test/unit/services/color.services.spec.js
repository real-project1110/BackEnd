const ColorService = require('../../../services/colors.service')

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
    
    findGroupId: jest.fn(),
    getGroupId: jest.fn(),
})

describe('color Test',()=>{
    let colorService= new ColorService()
    colorService.colorRepository = mockColorModel()
    
    beforeEach(()=>{
        jest.resetAllMocks()
    })

    test('colorService Method createColor sucess case',async()=>{
        const {userId, groupId, color, content} = data

        colorService.colorRepository.createColor=jest.fn(()=>{
            return data
        })

        colorService.colorRepository.getGroupId=jest.fn(()=>{
            return requestParams
        })

        const colors = await colorService.createColor({userId, groupId, color, content})

        expect(colorService.colorRepository.createColor).toHaveBeenCalledTimes(1)

        expect(colors).toEqual({groupId,color,content})

    })

    // test('colorService Method createColor fail case',async()=>{
    //     const {userId, groupId, color, content} = data

    //     colorService.colorRepository.createColor=jest.fn(()=>false)

    //     await colorService.createColor({userId, groupId, color, content})

    //     expect(colorService.colorRepository.createColor).toThrowError(new Error('유저 정보가 없습니다'))

    // })


    test('colorService Method getColor sucess case',async()=>{
        const {groupId} = requestParams

        colorService.colorRepository.getColor=jest.fn(()=>{
            return data
        })

        colorService.colorRepository.findGroupId=jest.fn(()=>{
            return data2
        })

        const getcolor=await colorService.getColor({groupId})

        expect(colorService.colorRepository.findGroupId).toHaveBeenCalledTimes(1)

        expect(getcolor).toEqual(data2)
    })
    
    // test('colorService Method getColor fail case',async()=>{
    //     colorService.colorRepository.getColor=jest.fn(()=>fail)

    //     await colorService.getColor(mockColorRequest,mockColorResponse,next)

    //     expect(colorService.colorRepository.getColor).toHaveBeenCalledTimes(1)

    //     expect(next).toHaveBeenCalledTimes(1)
    // })

    test('colorService Method updateColor sucess case',async()=>{
        const {groupId, colorId, color, content} = data3
        const {userId} = responseLocalsUser
        
        colorService.colorRepository.updateColor=jest.fn(()=>{
            return data
        })

        colorService.colorRepository.getGroupId=jest.fn(()=>{
            return requestParams
        })

        const colors = await colorService.updateColor({userId, groupId, colorId, color, content})

        expect(colorService.colorRepository.updateColor).toHaveBeenCalledTimes(1)

        expect(colors).toEqual({color,content})


    })
    
    test('colorService Method deleteColor sucess case',async()=>{
        const {userId} = responseLocalsUser
        const {colorId,groupId} = data3
        
        colorService.colorRepository.deleteColor=jest.fn(()=>{
            return data3
        })
        
        colorService.colorRepository.getGroupId=jest.fn(()=>{
            return requestParams
        })

        await colorService.deleteColor({ userId, colorId, groupId })

        expect(colorService.colorRepository.deleteColor).toHaveBeenCalledTimes(1)
    })

    
    // test('colorService Method deleteColor fail case',async()=>{
    //     colorService.colorRepository.deleteColor=jest.fn(()=>fail)

    //     await colorService.deleteColor(mockColorRequest,mockColorResponse,next)

    //     expect(colorService.colorRepository.deleteColor).toHaveBeenCalledTimes(1)

    //     expect(next).toHaveBeenCalledTimes(1)
    // })

})
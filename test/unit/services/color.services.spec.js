const ColorService = require('../../../services/colors.service')

const {
    requestParams,
    requestParams2,
    requestBody,
    responseLocalsUser,
    data
    
} = require('../../fixtures/color.fixtures')

const mockColorModel= ()=>({
    
    findGroupId: jest.fn(),
    getGroupId: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
})
  let mockColorRequest={
    body:jest.fn(),
    params:jest.fn()
  }

  let mockColorResponse={
    status:jest.fn(),
    json:jest.fn(),
    locals:jest.fn(),
    send:jest.fn()
  }

  
  let next = jest.fn()

describe('color Test',()=>{
    let colorService= new ColorService()
    colorService.colorRepository = mockColorModel()
    
    beforeEach(()=>{
        jest.resetAllMocks()
    })

    test('colorService Method createColor sucess case',async()=>{
        const {userId, groupId, color, content} = data
        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })

        colorService.colorRepository.createColor=jest.fn(()=>{
            return data
        })

        colorService.colorRepository.getGroupId=jest.fn(()=>{
            return requestParams
        })

        await colorService.createColor(userId, groupId, color, content)

        expect(colorService.colorRepository.createColor).toHaveBeenCalledTimes(1).toThrow()

    })

    test('colorService Method createColor fail case',async()=>{
        colorService.colorRepository.createColor=jest.fn(()=>fail)

        await colorService.createColor(mockColorRequest,mockColorResponse,next)

        expect(colorService.colorRepository.createColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })


    test('colorService Method getColor sucess case',async()=>{
        mockColorRequest.params= requestParams

        const arr = []
        colorService.colorRepository.getColor=jest.fn(()=>{
            return data
        })

        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })

        await colorService.getColor(mockColorRequest,mockColorResponse)

        expect(colorService.colorRepository.getColor).toHaveBeenCalledTimes(1)
        expect(mockColorResponse.status).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledWith({data})
    })
    
    test('colorService Method getColor fail case',async()=>{
        colorService.colorRepository.getColor=jest.fn(()=>fail)

        await colorService.getColor(mockColorRequest,mockColorResponse,next)

        expect(colorService.colorRepository.getColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })

    test('colorService Method updateColor sucess case',async()=>{
        mockColorResponse.locals.user=responseLocalsUser
        mockColorRequest.params=requestParams2
        mockColorRequest.body=requestBody

        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })
        
        colorService.colorRepository.updateColor=jest.fn(()=>{
            return data
        })

        await colorService.updateColor(mockColorRequest,mockColorResponse,next)

        expect(colorService.colorRepository.updateColor).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.status).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledWith({data:data.groupId,message:'컬러 수정 완료'})
    })

    test('colorService Method updateColor fail case',async()=>{
        colorService.colorRepository.updateColor=jest.fn(()=>fail)

        await colorService.updateColor(mockColorRequest,mockColorResponse,next)

        expect(colorService.colorRepository.updateColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })

    
    test('colorService Method deleteColor sucess case',async()=>{
        mockColorResponse.locals.user=responseLocalsUser
        mockColorRequest.params=requestParams2

        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })
        
        colorService.colorRepository.deleteColor=jest.fn(()=>{
            return data
        })

        await colorService.deleteColor(mockColorRequest,mockColorResponse,next)

        expect(colorService.colorRepository.deleteColor).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.status).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledWith({data,message:'컬러 삭제 완료'})
    })

    
    test('colorService Method deleteColor fail case',async()=>{
        colorService.colorRepository.deleteColor=jest.fn(()=>fail)

        await colorService.deleteColor(mockColorRequest,mockColorResponse,next)

        expect(colorService.colorRepository.deleteColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })

})
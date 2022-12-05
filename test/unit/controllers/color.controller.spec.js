const ColorController = require('../../../controllers/colors.controller')

const {
    requestParams,
    requestParams2,
    requestBody,
    responseLocalsUser,
    data
    
} = require('../../fixtures/color.fixtures')

const mockColorModel= ()=>({
    
    findAll: jest.fn(),
    findOne: jest.fn(),
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
    let colorController= new ColorController()
    colorController.colorService = mockColorModel()
    
    beforeEach(()=>{
        jest.resetAllMocks()
    })

    test('colorsController Method createColor sucess case',async()=>{
        mockColorRequest.params = requestParams
        mockColorRequest.body = requestBody
        mockColorResponse.locals.user = responseLocalsUser

        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })

        colorController.colorService.createColor=jest.fn(()=>{
            return data
        })

        await colorController.createColor(mockColorRequest,mockColorResponse)

        expect(colorController.colorService.createColor).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.status).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledTimes(1)

    })

    test('colorController Method createColor fail case',async()=>{
        colorController.colorService.createColor=jest.fn(()=>fail)

        await colorController.createColor(mockColorRequest,mockColorResponse,next)

        expect(colorController.colorService.createColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })


    test('colorsController Method getColor sucess case',async()=>{
        mockColorRequest.params= requestParams

        const arr = []
        colorController.colorService.getColor=jest.fn(()=>{
            return data
        })

        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })

        await colorController.getColor(mockColorRequest,mockColorResponse)

        expect(colorController.colorService.getColor).toHaveBeenCalledTimes(1)
        expect(mockColorResponse.status).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledWith({data})
    })
    
    test('colorController Method getColor fail case',async()=>{
        colorController.colorService.getColor=jest.fn(()=>fail)

        await colorController.getColor(mockColorRequest,mockColorResponse,next)

        expect(colorController.colorService.getColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })

    test('colorController Method updateColor sucess case',async()=>{
        mockColorResponse.locals.user=responseLocalsUser
        mockColorRequest.params=requestParams2
        mockColorRequest.body=requestBody

        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })
        
        colorController.colorService.updateColor=jest.fn(()=>{
            return data
        })

        await colorController.updateColor(mockColorRequest,mockColorResponse,next)

        expect(colorController.colorService.updateColor).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.status).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledWith({data:data.groupId,message:'컬러 수정 완료'})
    })

    test('colorController Method updateColor fail case',async()=>{
        colorController.colorService.updateColor=jest.fn(()=>fail)

        await colorController.updateColor(mockColorRequest,mockColorResponse,next)

        expect(colorController.colorService.updateColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })

    
    test('colorController Method deleteColor sucess case',async()=>{
        mockColorResponse.locals.user=responseLocalsUser
        mockColorRequest.params=requestParams2

        mockColorResponse.status=jest.fn(()=>{
            return mockColorResponse
        })
        
        colorController.colorService.deleteColor=jest.fn(()=>{
            return data
        })

        await colorController.deleteColor(mockColorRequest,mockColorResponse,next)

        expect(colorController.colorService.deleteColor).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.status).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledTimes(1)

        expect(mockColorResponse.json).toHaveBeenCalledWith({data,message:'컬러 삭제 완료'})
    })

    
    test('colorController Method deleteColor fail case',async()=>{
        colorController.colorService.deleteColor=jest.fn(()=>fail)

        await colorController.deleteColor(mockColorRequest,mockColorResponse,next)

        expect(colorController.colorService.deleteColor).toHaveBeenCalledTimes(1)

        expect(next).toHaveBeenCalledTimes(1)
    })

})
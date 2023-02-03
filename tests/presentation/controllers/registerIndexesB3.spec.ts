import { GetIndexesB3Controller } from '../../../src/presentation/controllers/get-indexes-b3-controller'
import { MissingParamError, ServerError } from '../../../src/presentation/errors'
import { IGetIndexes } from '../../../src/presentation/interfaces'

interface SutTypes {
  sut: GetIndexesB3Controller
  getIndexesStub: IGetIndexes
}

const makeGetIndexes = (): IGetIndexes => {
  class GetIndexesStub implements IGetIndexes {
    request (data: any): any {
      return {}
    }
  }

  return new GetIndexesStub()
}

const makeSut = (): SutTypes => {
  const getIndexesStub = makeGetIndexes()
  const sut = new GetIndexesB3Controller(getIndexesStub)

  return {
    sut,
    getIndexesStub
  }
}

describe('GetIndexesB3Controller', () => {
  test('Should return 400 if no api key is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        function: 'any_function',
        symbol: 'any_symbol'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('api_key'))
  })

  test('Should return 400 if no function is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        api_key: 'any_api_key',
        symbol: 'any_symbol'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('function'))
  })

  test('Should return 400 if no symbol is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        api_key: 'any_api_key',
        function: 'any_function'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('symbol'))
  })

  test('Should call GetIndexes with correct data', () => {
    const { sut, getIndexesStub } = makeSut()
    const requestSpy = jest.spyOn(getIndexesStub, 'request')
    const httpRequest = {
      body: {
        api_key: 'any_api_key',
        function: 'any_function',
        symbol: 'any_symbol'
      }
    }
    sut.handle(httpRequest)
    expect(requestSpy).toHaveBeenCalledWith({
      api_key: 'any_api_key',
      function: 'any_function',
      symbol: 'any_symbol'
    })
  })

  test('Should return 500 if GetIndexes throws', () => {
    const { sut, getIndexesStub } = makeSut()
    jest.spyOn(getIndexesStub, 'request').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        api_key: 'any_api_key',
        function: 'any_function',
        symbol: 'any_symbol'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})

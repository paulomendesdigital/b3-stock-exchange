import { RegisterIndexController } from '../../../src/presentation/controllers/register-index/register-index-controller'
import { MissingParamError, ServerError } from '../../../src/presentation/errors'
import { IGetIndex, IndexModel, AddIndexModel, IAddIndex } from '../../../src/presentation/controllers/register-index/register-index-interfaces'

const makeGetIndex = (): IGetIndex => {
  class GetIndexStub implements IGetIndex {
    request (index: any): any {
      return {}
    }
  }

  return new GetIndexStub()
}

const makeAddIndex = (): IAddIndex => {
  class AddIndexStub implements IAddIndex {
    add (index: AddIndexModel): IndexModel {
      const fakeIndex = {
        id: 'valid_id',
        name: 'valid_name',
        price_open: 999,
        price_close: 999,
        price_high: 999,
        price_low: 999,
        price_day: new Date()
      }

      return fakeIndex
    }
  }

  return new AddIndexStub()
}

interface SutTypes {
  sut: RegisterIndexController
  getIndexStub: IGetIndex
  addIndexStub: IAddIndex
}

const makeSut = (): SutTypes => {
  const getIndexStub = makeGetIndex()
  const addIndexStub = makeAddIndex()
  const sut = new RegisterIndexController(getIndexStub, addIndexStub)

  return {
    sut,
    getIndexStub,
    addIndexStub
  }
}

describe('RegisterIndexController', () => {
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

  test('Should call GetIndex with correct data', () => {
    const { sut, getIndexStub } = makeSut()
    const requestSpy = jest.spyOn(getIndexStub, 'request')
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

  test('Should return 500 if GetIndex throws', () => {
    const { sut, getIndexStub } = makeSut()
    jest.spyOn(getIndexStub, 'request').mockImplementationOnce(() => {
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

  test('Should call AddIndex with correct values', () => {
    const { sut, getIndexStub, addIndexStub } = makeSut()

    const getIndexResponse = {
      'Meta Data': {
        '1. Information': 'Weekly Adjusted Prices and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2023-02-07',
        '4. Time Zone': 'US/Eastern'
      },
      'Weekly Adjusted Time Series': {
        '2023-02-07': {
          '1. open': '135.8300',
          '2. high': '136.4000',
          '3. low': '134.4500',
          '4. close': '135.8400',
          '5. adjusted close': '135.8400',
          '6. volume': '8578853',
          '7. dividend amount': '0.0000'
        }
      }
    }

    jest.spyOn(getIndexStub, 'request').mockImplementationOnce(() => {
      return getIndexResponse
    })

    const addSpy = jest.spyOn(addIndexStub, 'add')

    const httpRequest = {
      body: {
        api_key: 'any_api_key',
        function: 'any_function',
        symbol: 'any_symbol'
      }
    }

    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(getIndexResponse)
  })

  test('Should return 500 if AddIndex throws', () => {
    const { sut, addIndexStub } = makeSut()
    jest.spyOn(addIndexStub, 'add').mockImplementationOnce(() => {
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

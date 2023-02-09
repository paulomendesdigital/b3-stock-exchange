import { RegisterIndexesB3Controller } from '../../../src/presentation/controllers/register-index/register-indexes-b3-controller'
import { MissingParamError, ServerError } from '../../../src/presentation/errors'
import { IGetIndexes, IndexModel, AddIndexModel, IAddIndex } from '../../../src/presentation/controllers/register-index/register-index-interfaces'

const makeGetIndexes = (): IGetIndexes => {
  class GetIndexesStub implements IGetIndexes {
    request (index: any): any {
      return {}
    }
  }

  return new GetIndexesStub()
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
  sut: RegisterIndexesB3Controller
  getIndexesStub: IGetIndexes
  addIndexStub: IAddIndex
}

const makeSut = (): SutTypes => {
  const getIndexesStub = makeGetIndexes()
  const addIndexStub = makeAddIndex()
  const sut = new RegisterIndexesB3Controller(getIndexesStub, addIndexStub)

  return {
    sut,
    getIndexesStub,
    addIndexStub
  }
}

describe('RegisterIndexesB3Controller', () => {
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

  test('Should call AddIndex with correct values', () => {
    const { sut, getIndexesStub, addIndexStub } = makeSut()

    const getIndexesResponse = {
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

    jest.spyOn(getIndexesStub, 'request').mockImplementationOnce(() => {
      return getIndexesResponse
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
    expect(addSpy).toHaveBeenCalledWith(getIndexesResponse)
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

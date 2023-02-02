import { GetIndexesAlphaVantageController } from '../../../src/presentation/controllers/get-indexes-alpha-vantage-controller'

describe('GetIndexesAlphaVantageController', () => {
  test('Should return 400 if no api key is provided', () => {
    const sut = new GetIndexesAlphaVantageController()
    const httpRequest = {
      body: {
        function: 'any_function',
        symbol: 'any_symbol'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})

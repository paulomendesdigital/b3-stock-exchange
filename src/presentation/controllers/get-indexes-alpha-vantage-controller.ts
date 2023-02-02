import { HttpRequest, HttpResponse } from '../../../src/presentation/protocols/http'

export class GetIndexesAlphaVantageController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.api_key) {
      return {
        statusCode: 400,
        body: new Error('Missing param: api_key')
      }
    }

    if (!httpRequest.body.function) {
      return {
        statusCode: 400,
        body: new Error('Missing param: function')
      }
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}

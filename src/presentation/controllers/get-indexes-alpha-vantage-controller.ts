import { HttpRequest, HttpResponse } from '../../../src/presentation/protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class GetIndexesAlphaVantageController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.api_key) {
      return {
        statusCode: 400,
        body: new MissingParamError('api_key')
      }
    }

    if (!httpRequest.body.function) {
      return {
        statusCode: 400,
        body: new MissingParamError('function')
      }
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}

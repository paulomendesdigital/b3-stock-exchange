import { HttpRequest, HttpResponse } from '../../../src/presentation/protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class GetIndexesAlphaVantageController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['api_key', 'function', 'symbol']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}

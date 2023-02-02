import { HttpRequest, HttpResponse } from '../../../src/presentation/protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class GetIndexesAlphaVantageController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.api_key) {
      return badRequest(new MissingParamError('api_key'))
    }

    if (!httpRequest.body.function) {
      return badRequest(new MissingParamError('function'))
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}

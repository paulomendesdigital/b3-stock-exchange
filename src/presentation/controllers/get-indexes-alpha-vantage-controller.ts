import { IHttpRequest, IHttpResponse } from '../interfaces/i-http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { IController } from '../interfaces/i-controller'

export class GetIndexesAlphaVantageController implements IController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
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

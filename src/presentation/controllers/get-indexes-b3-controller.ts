import { IHttpRequest, IHttpResponse } from '../interfaces/i-http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { IController } from '../interfaces/i-controller'
import { IGetIndexes } from '../interfaces/i-get-indexes'
import { ServerError } from '../errors/server-error'

export class GetIndexesB3Controller implements IController {
  constructor (private readonly getIndexes: IGetIndexes) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['api_key', 'function', 'symbol']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const indexes = this.getIndexes.request(httpRequest.body)

      if (!indexes) {
        return {
          statusCode: 400,
          body: ''
        }
      }

      return {
        statusCode: 200,
        body: ''
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
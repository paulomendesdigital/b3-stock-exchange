import { IHttpRequest, IHttpResponse, IController, IGetIndexes } from '../interfaces'
import { MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class RegisterIndexesB3Controller implements IController {
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
      return serverError()
    }
  }
}

import { IHttpRequest, IHttpResponse, IController, IGetIndexes, IAddIndex } from './register-index-interfaces'
import { MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'

export class RegisterIndexesB3Controller implements IController {
  constructor (
    private readonly getIndexes: IGetIndexes,
    private readonly addIndex: IAddIndex
  ) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['api_key', 'function', 'symbol']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const indexes = this.getIndexes.request(httpRequest.body)

      if (indexes.error) {
        return {
          statusCode: indexes.statusCode,
          body: indexes
        }
      }

      this.addIndex.add(indexes)

      return {
        statusCode: 200,
        body: ''
      }
    } catch (error) {
      return serverError()
    }
  }
}

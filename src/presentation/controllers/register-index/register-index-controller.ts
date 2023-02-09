import { IHttpRequest, IHttpResponse, IController, IGetIndex, IAddIndex } from './register-index-interfaces'
import { MissingParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class RegisterIndexController implements IController {
  constructor (
    private readonly getIndex: IGetIndex,
    private readonly addIndex: IAddIndex
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['api_key', 'function', 'symbol']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const apiIndex = this.getIndex.request(httpRequest.body)

      if (apiIndex.error) {
        return {
          statusCode: apiIndex.statusCode,
          body: apiIndex
        }
      }

      const index = await this.addIndex.add(apiIndex)

      return ok(index)
    } catch (error) {
      return serverError()
    }
  }
}

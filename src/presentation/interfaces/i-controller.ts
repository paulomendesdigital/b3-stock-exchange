import { HttpRequest, HttpResponse } from './i-http'

export interface IController {
  handle: (httpRequest: HttpRequest) => HttpResponse
}

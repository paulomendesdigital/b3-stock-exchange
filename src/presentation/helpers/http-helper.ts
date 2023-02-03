import { HttpResponse } from '../interfaces/i-http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export class GetIndexesAlphaVantageController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.api_key) {
      return {
        statusCode: 400,
        body: new Error('Missing param: api_key')
      }
    }

    if (!httpRequest.body.function) {
      return {
        statusCode: 400,
        body: new Error('Missing param: function')
      }
    }
  }
}

import request from 'request'

class Grubhub {
  constructor() {
    this.token = '2b609849-13fd-4be5-83cb-22d8b18a908b'
  }

  connect(refreshToken) {
    return new Promise((resolve, reject) => {
      request(
        {
          method: 'POST',
          url: 'https://api-gtm.grubhub.com/auth',
          json: {
            brand: 'GRUBHUB',
            client_id: 'beta_UmWlpstzQSFmocLy3h1UieYcVST',
            device_id: 1185401174,
            refresh_token: refreshToken,
          },
        },
        (err, resp, body) => {
          if (err) {
            return reject(err)
          }
          console.log('body', body)
          // this.token = body.session_handle.access_token
          // this.user_id = body.credential.ud_id
          resolve(body)
        }
      )
    })
  }

  getOrders() {
    return new Promise((resolve, reject) => {
      request(
        {
          method: 'GET',
          url:
            'https://api-gtm.grubhub.com/diners/' +
            'e845b182-487e-11e4-9697-9cb654858910' + // TODO: UN HARDCODE THIS
            '/details?',
          json: true,
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        },
        (err, resp, body) => {
          if (err) {
            return reject(err)
          }
          // console.log('body', body);
          // resolve(body.search_result.results)
        }
      )
    })
  }
}
export { Grubhub }

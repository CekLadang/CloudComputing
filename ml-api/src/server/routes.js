const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        maxBytes: 5000000,
        multipart: true
      }
    }
  }
]

module.exports = routes;
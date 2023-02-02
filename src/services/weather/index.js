const controllers = require('./controllers');

module.exports = {
  name: '날씨 가져오는 API',
  baseURL: '/weather',
  routes: [
    {
      method: 'get',
      path: '/latitude/:_latitude/longitude/:_longitude',
      needAuth: false,
      needPermission: false,
      handler: controllers.getWeatherByPosition,
    },
  ],
};
const controllers = require('./controllers');

module.exports = {
  name: 'OpenAI',
  baseURL: '/fashion',
  routes: [
    {
      method: 'post',
      path: '/generate',
      needAuth: false,
      needPermission: false,
      handler: controllers.getFashionByWeatherData,
    },
  ],
};
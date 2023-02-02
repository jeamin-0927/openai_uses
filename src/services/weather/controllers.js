const { Request, Response } = require('express');
const axios = require('axios');

module.exports = {
  getWeatherByPosition: async (req = Request, res = Response) => {
    const { _latitude, _longitude } = req.params;

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
          'lat': _latitude,
          'lon': _longitude,
          'appid': process.env.OPENWEATHERMAP_API_KEY
      }
    });
    const data = response.data;

    res.json({
      ...data
    });
  },
};
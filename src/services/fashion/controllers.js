const { Request, Response } = require('express');
const axios = require('axios');
const { GPT3 } = require('../../utils/openai');
// await openaiResponse("say hello")

module.exports = {
  getFashionByWeatherData: async (req = Request, res = Response) => {
    const query = `
    Please make a list by recommending clothes according to the following weather.

    Please respond with a array of json in this form.
    Leave out the rest of the words except for the array/json form.
    {
      "type": "",
      "name": "",
      "color": {
        "name": "",
        "hex": "#",
        "rgb": {"r": "", "g": "", "b": ""},
        "cmyk": {"c": "", "m": "", "y": "", "k": ""}
      },
      "image": ""
    }

    Please tell me including the exact color.
    Please search according to the api below and let me know the image url.
    https://source.unsplash.com/1600x1600/?<PUT YOUR QUERY HERE>
    
    Please classify the type, name, color, and image of clothes in the json form.

    Weather Data
    ${req.body}
    `;
    console.log(query);
    const GPTdata = await GPT3(query);
    console.log(GPTdata);
    res.json(JSON.parse(GPTdata));
  },
};
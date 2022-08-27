const axios = require("axios");
require('dotenv').config();

function joke(message) {
    const options = {
        method: 'GET',
        url: 'https://jokeapi-v2.p.rapidapi.com/joke/Misc',
        params: { format: 'txt', blacklistFlags: 'nsfw,racist' },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_KEY,
            'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        jokeData = response.data
        message.reply(jokeData);
    }).catch(function (error) {
        console.error(error);
    });
}
module.exports.joke = joke
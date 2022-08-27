const axios = require("axios");
// dotenv
require('dotenv').config();
function quotes(message) {
    try {

        const options = {
            method: 'POST',
            url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPID_KEY,
                'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
            },
            data: '{"key1":"value","key2":"value"}'
        };

        axios.request(options).then(function (response) {
            quote = response.data
            message.reply(quote);
        }).catch(function (error) {
            console.error(error);
        });
    } catch (err) {
        console.log(err);
    }

}



module.exports.quotes = quotes
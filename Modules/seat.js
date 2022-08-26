const fs = require('fs')
const http = require('http');
const { MessageMedia } = require('whatsapp-web.js');

function seat(message,client,media) {
    try{
        client.sendMessage(chatId = message.from, media);
    }catch(err){
        console.log(err);
    }

}



module.exports.seat = seat
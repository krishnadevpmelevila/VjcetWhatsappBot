function seat(message,client,media) {
    try{
        client.sendMessage(chatId = message.from, 'All the best for your exam Makkkalleee!!');
        client.sendMessage(chatId = message.from, media);
    }catch(err){
        console.log(err);
    }

}



module.exports.seat = seat
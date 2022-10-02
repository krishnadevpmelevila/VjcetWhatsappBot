const { MessageMedia } = require("whatsapp-web.js");

function stickerCommand(message,media,client) {
    const sticker = new MessageMedia('image/png', media.data);
    client.sendMessage(chatId = message.from, sticker, { sendMediaAsSticker: true });

}


    
module.exports.stickercommand = stickerCommand
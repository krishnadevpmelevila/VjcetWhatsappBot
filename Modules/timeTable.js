const { MessageMedia } = require('whatsapp-web.js');

table = require('../HelperFiles/timetable.json');



function timetable(p) {
    day = new Date().getDay();
    hr = new Date().getHours();
    min = new Date().getMinutes();
    return table[day - 1][p];
}
function fulltimeTable(message,client) {
    try{
        const media = MessageMedia.fromFilePath('HelperFiles/timetable.jpg');
        client.sendMessage(chatId = message.from, media);
    }catch(err){
        console.log(err);
    }
}

module.exports.timetable = timetable
module.exports.fulltimeTable = fulltimeTable



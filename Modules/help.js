
fs = require('fs');
function helpCommand(message) {

    fs.readFile('HelperFiles/help.txt', 'utf8', function (err, data) {
        if (err) throw err;
        message.reply(data)
    })


}


module.exports.helpCommand = helpCommand;
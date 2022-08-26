var helpText = "Hi, My name is Kumarettan! I am here to assist you.\n\nYou can use the following commands (Don't forget the exclamatory(!) mark before each commands):\n\n 1. !seat - To get seating arrangement\n 2. !help - To view this help\n "

function helpCommand(message) {
    message.reply(helpText)

}



module.exports.helpCommand = helpCommand
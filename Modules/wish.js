const count=0;
function goodmorning(message, client) {
    let date_ob = new Date();
    let hours = date_ob.getHours()
    if (hours < 9 && count == 0) {
        message.reply('Good Morning pillere...!');

    }
    if (hours > 9) {
        count++
        return null
    }
}

module.exports.goodmorning = goodmorning


//planning to do in future
const qrcode = require('qrcode-terminal');
const http = require('http');
const fs = require('fs')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { helpCommand } = require('./Modules/help');
const { seat } = require('./Modules/seat');
const { stickercommand } = require('./Modules/sticker');
const { quotes } = require('./Modules/quotes');
const { timetable, fulltimeTable } = require('./Modules/timeTable');
const { tts } = require('./Modules/tts');
// const { goodmorning } = require('./Modules/wish');

let sessionData;
const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    // create a web server
    http.createServer(function (req, res) {
        // send the current session to the page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Session</h1>');
        res.write('<pre>' + JSON.stringify(sessionData) + '</pre>');
        res.end();
    }
    ).listen(3000);

});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
    if(message.body.toLowerCase()==='!about'|| message.body.toLowerCase() == "! about"){
        message.reply("Hi, I am Kumarettan, My developer is Krishnadev P Melevila and his friends of CSEA 2021-25 batch,VJCET. If you spot any bug on Kumarettan, Please inform us through +918089188971 or mail to 21rr172@vjcet.org")
    }
});







client.on('message', async message => {

    // goodmorning(message,client)

    // Seat scrapping  
    if (message.body.toLowerCase() == '!seat' || message.body.toLowerCase() == "! seat") {
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3', ["scrap.py"]);
        pythonProcess.stdout.on('data', (data) => {
            fs.unlinkSync('seat.pdf', (err) => {
                if (err) {
                    console.error("err")
                    return
                }
            })

            const file = fs.createWriteStream("seat.pdf");
            const request = http.get(data.toString(), function (response) {
                response.pipe(file);

                // after download completed close filestream
                file.on("finish", () => {
                    file.close();
                    const media = MessageMedia.fromFilePath('seat.pdf');
                    seat(message, client, media)
                });

            });
        });


    }
    // help command
    if (message.body.toLowerCase() == '!help' || message.body.toLowerCase() == "! help" || message.body.toLowerCase()=='hi'|| message.body.toLowerCase()=='hello') {
        helpCommand(message)
    }

    // timetable
    if (message.body.toLowerCase().startsWith('!p') ){
        var p = message.body.split('')[2];
        period = timetable(p);
        message.reply(period);    
    }
    if (message.body.toLowerCase()=="!tt" || message.body.toLowerCase()=="!tt" ) {
       fulltimeTable(message,client);   
    }
    // sticker
    if (message.hasMedia) {
        if (message.body.toLowerCase() == "!sticker" || message.body.toLowerCase() == "! sticker") {
            const media = await message.downloadMedia();
            stickercommand(message, media, client)
        }
    }
    // quotes
    if (message.body.toLowerCase() == "!quotes" || message.body.toLowerCase() == "! quotes" || message.body.toLowerCase()=="!quote" || message.body.toLowerCase()=="! quote") {
        quotes(message)
    }
    if (message.body.toLowerCase().startsWith('!tts')){
        var text = message.body.split('!tts')[1];
        tts(message,client,text)
    }

    

})
client.initialize();

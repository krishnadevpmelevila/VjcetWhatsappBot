const qrcode = require('qrcode-terminal');
const http = require('http');
const fs = require('fs')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { helpCommand } = require('./Modules/help');
const { seat } = require('./Modules/seat');
const { stickercommand } = require('./Modules/sticker');
const { quotes } = require('./Modules/quotes');
const { joke } = require('./Modules/joke');
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
    if(message.body.toLowerCase()=='!jokes'||message.body.toLowerCase()=='! jokes' || message.body.toLowerCase()=='!joke'||message.body.toLowerCase()=='! joke'){
       joke(message)
    }

})
client.initialize();

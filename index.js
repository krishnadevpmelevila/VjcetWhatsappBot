const qrcode = require('qrcode-terminal');
const fs = require('fs')
const http = require('http');
const { Client, LocalAuth,MessageMedia } = require('whatsapp-web.js');
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
    console.log(message.body);
});
client.on('message', message => {
    if (message.body === '!ping') {


    }
});


client.on('message', message => {

    if (message.body === '!seat') {
        console.log(message);
        
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3', ["scrap.py"]);
        console.log(pythonProcess);
        pythonProcess.stdout.on('data', (data) => {
            fs.unlinkSync('seat.pdf', (err) => {
                if (err) {
                    console.error(err)
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
                    client.sendMessage(chatId= message.from, media);
                });
                
            });
        });


    }
})
client.initialize();

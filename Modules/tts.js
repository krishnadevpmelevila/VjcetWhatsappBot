const googleTTS = require("google-tts-api"); // CommonJS
const fs = require("fs");
const https = require("https");
const { MessageMedia } = require("whatsapp-web.js");

function tts(message, client, text) {
  // get audio URL
  const url = googleTTS.getAudioUrl(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });
  console.log(url); // https://translate.google.com/translate_tts?...

  https.get(url, (res) => {
    fs.unlinkSync("HelperFiles/Audios/audio.mp3");
    // Image will be stored at this path
    const path = `HelperFiles/Audios/audio.mp3`;
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on("finish", () => {
      filePath.close();
      console.log("Download Completed");
      const media = MessageMedia.fromFilePath("HelperFiles/Audios/audio.mp3");
      client.sendMessage(message.from, media, { sendAudioAsVoice: true });
    });
  });
}
module.exports.tts = tts;

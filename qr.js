const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Maher_Zubair,
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const pino = require('pino');
const QRCode = require('qrcode');
const {
    default: Maher_Zubair,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('maher-zubair-baileys');
const { makeid } = require('./id');

function removeFile(path) {
    if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true, force: true });
    }
}

const router = express.Router();

router.get('/', async (req, res) => {
    const id = makeid();

    async function SIGMA_MD_QR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Qr_Code_By_Maher_Zubair = Maher_Zubair({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
                },
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
            });

            Qr_Code_By_Maher_Zubair.ev.on('creds.update', saveCreds);

            Qr_Code_By_Maher_Zubair.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect, qr } = s;

                if (qr) {
                    const qrBuffer = await QRCode.toBuffer(qr);
                    if (!res.headersSent) res.end(qrBuffer);
                }

                if (connection === "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');

                    let session = await Qr_Code_By_Maher_Zubair.sendMessage(
                        Qr_Code_By_Maher_Zubair.user.id,
                        { text: "" + b64data }
                    );

                    let SIGMA_MD_TEXT = `
┏━━━━━━━━━━━━━━
┃SOLO-LEVELING MD SESSION IS 
┃SUCCESSFULLY
┃CONNECTED ✅🔥
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *_CREATED BY = ᴅ.ʀᴜᴋꜱʜᴀɴ ( ʀᴇᴅ ꜱᴀᴍᴜʀᴀʏ🐉)_*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *WHATSAPP CHANNEL = https://whatsapp.com/channel/0029VbAWWH9BFLgRMCXVlU38*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *ANIME CHANNEL = https://whatsapp.com/channel/0029VbAjwpWAojYrZOdaVO0i*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⛩️ || *TELEGRAM = https://t.me/legionofdoom999*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬

🐉 *ABOUT = 私がこのプログラムを始めた理由は、SOLO-LEVELING アニメのためです。🇯🇵*
🐉 *THANK ALL PEPPERS🎗️*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
> *® ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʀᴜᴋꜱʜᴀɴ ʟᴏᴅ ᴛᴇᴍ*
`;

                    await Qr_Code_By_Maher_Zubair.sendMessage(
                        Qr_Code_By_Maher_Zubair.user.id,
                        { text: SIGMA_MD_TEXT },
                        { quoted: session }
                    );

                    // MP3 AUDIO SEND BLOCK
                    const mp3Url = 'https://files.catbox.moe/r4r0hz.mp3';
                    const response = await axios.get(mp3Url, { responseType: 'arraybuffer' });

                    await Qr_Code_By_Maher_Zubair.sendMessage(
                        Qr_Code_By_Maher_Zubair.user.id,
                        {
                            audio: Buffer.from(response.data),
                            mimetype: 'audio/mp4',
                            ptt: true
                        },
                        { quoted: session }
                    );

                    await delay(100);
                    await Qr_Code_By_Maher_Zubair.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (
                    connection === "close" &&
                    lastDisconnect &&
                    lastDisconnect.error &&
                    lastDisconnect.error.output.statusCode !== 401
                ) {
                    await delay(10000);
                    SIGMA_MD_QR_CODE();
                }
            });
        } catch (err) {
            if (!res.headersSent) {
                await res.json({ code: "Service Unavailable" });
            }
            console.log(err);
            await removeFile('./temp/' + id);
        }
    }

    return await SIGMA_MD_QR_CODE();
});

module.exports = router;

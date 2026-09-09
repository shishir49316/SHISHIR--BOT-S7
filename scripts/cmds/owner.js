const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "owner",
    aliases: ["admininfo", "", "ownerinfo"],
    version: "4.0",
    author: "xalman",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Show owner information" },
    category: "owner",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ api, event, message }) {

    const ownerName = "𝐀𝐡𝐦𝐞𝐃’𝐳 𝐒𝐇𝐈𝐒𝐇𝐈𝐑";
    const ownerAge = "17";
    const fbName = "𝐀𝐡𝐦𝐞𝐃’𝐳 𝐒𝐇𝐈𝐒𝐇𝐈𝐑";
    const messenger = "https://www.facebook.com/share/14nVTCzS6Q7/";
    const whatsapp = "017493---26";
    const telegram = "@AhmeD'z Shi'shir ";
    const address = "𝙎𝙞𝙧𝙖𝙟𝙜𝙖𝙣𝙟, DʜAKA, 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡";
    const religion = "𝙄𝙨𝙡𝙖𝙢";
    const apiServer = "https://shishir-apis.vercel.app";
    const relationship = "𝘀𝗶𝗻𝗴𝗹𝗲";
    const videoLink = "https://files.catbox.moe/vd43nx.mp4";

    const timeBD = moment().tz("Asia/Dhaka");

    const infoMsg = `
╭━━━〔 ✦ 𝗢𝗪𝗡𝗘𝗥 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 ✦ 〕━━━╮
┃
┃ 𓆩👑𓆪 𝗡𝗔𝗠𝗘
┃     ➥ ${ownerName}
┃
┃ 𓆩🎂𓆪 𝗔𝗚𝗘
┃     ➥ ${ownerAge}
┃
┃ 𓆩💫𓆪 𝗥𝗘𝗟𝗔𝗧𝗜𝗢𝗡𝗦𝗛𝗜𝗣
┃     ➥ ${relationship}
┃
┃ 𓆩☪️𓆪 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡
┃     ➥ ${religion}
┃
┃ 𓆩📍𓆪 𝗔𝗗𝗗𝗥𝗘𝗦𝗦
┃     ➥ ${address}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 ☎️ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 〕━━╮
┃
┃ 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞
┃ ➥ ${fbName}
┃
┃ 𝗙𝗕 𝗟𝗜𝗡𝗞
┃ ➥ ${messenger}
┃
┃ 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣
┃ ➥ ${whatsapp}
┃
┃ 𝗧𝗘𝗟𝗘𝗚𝗥𝗔𝗠
┃ ➥ ${telegram}
┃
┃ 𝗔𝗣𝗜 𝗦𝗘𝗥𝗩𝗘𝗥
┃ ➥ ${apiServer}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 🕐 𝗕𝗗 𝗧𝗜𝗠𝗘 〕━━╮
┃
┃ 📅 ${timeBD.format("DD • MMMM • YYYY")}
┃ ⏰ ${timeBD.format("hh:mm:ss A")}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

     👑   ✦𝐀𝐡𝐦𝐞𝐃’𝐳 𝐒𝐇𝐈𝐒𝐇𝐈𝐑  ✦👑
`;

    try {
      return message.reply({
        body: infoMsg,
        attachment: await global.utils.getStreamFromURL(videoLink)
      });
    } catch (e) {
      return message.reply(infoMsg);
    }
  },

  onChat: async function ({ api, event, message }) {
    if (event.body?.trim().toLowerCase() === "info") {
      return this.onStart({ api, event, message });
    }
  }
};

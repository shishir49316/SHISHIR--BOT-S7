// ╔══════════════════════════════════════╗
// ║        🎰 CASINO SYSTEM v4.0         ║
// ║        Clean • Unique • Safe         ║
// ╚══════════════════════════════════════╝

const MIN_BET = 50;
const MAX_BET = 20_000_000;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function casinoAnim(api, threadID, frames, delay = 500) {
  return new Promise(resolve => {
    api.sendMessage(frames[0], threadID, async (err, info) => {
      if (err || !info?.messageID) return resolve(null);

      const messageID = info.messageID;

      for (let i = 1; i < frames.length; i++) {
        await wait(delay);
        try {
          await api.editMessage(frames[i], messageID);
        } catch (_) {}
      }

      resolve(messageID);
    });
  });
}

function money(amount) {
  return Number(amount || 0).toLocaleString("en-US");
}

function validateBet(bet, balance, threadID, messageID, api) {
  if (!Number.isInteger(bet) || bet < MIN_BET) {
    api.sendMessage(
      `╭━━━〔 🚫 BET ERROR 〕━━━╮
┃
┃ 💰 Minimum Bet : $${money(MIN_BET)}
┃ 🎯 Your Bet    : $${money(bet)}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      threadID,
      messageID
    );
    return false;
  }

  if (bet > MAX_BET) {
    api.sendMessage(
      `╭━━━〔 ⚠️ BET LIMIT 〕━━━╮
┃
┃ 🔒 Maximum Bet : $20,000,000
┃ 💸 Your Bet    : $${money(bet)}
┃
┃ 🚫 You can't play above 20M.
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      threadID,
      messageID
    );
    return false;
  }

  if (balance < bet) {
    api.sendMessage(
      `╭━━━〔 💸 BALANCE LOW 〕━━━╮
┃
┃ 💵 Balance : $${money(balance)}
┃ 🎯 Bet     : $${money(bet)}
┃
┃ ❌ Not enough money!
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      threadID,
      messageID
    );
    return false;
  }

  return true;
}

module.exports = {
  config: {
    name: "casino",
    version: "4.0.0",
    author: "Azadx69x • Modified",
    role: 0,
    category: "GAMES",
    shortDescription: "Ultimate casino games",
    guide: "{p}casino [game] [args] [amount]"
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { threadID, messageID, senderID } = event;
    const prefix = global.GoatBot.config.prefix;

    let balance = await usersData.get(senderID, "money") || 0;
    balance = Number(balance);

    const game = (args[0] || "").toLowerCase();

    // ══════════════════════════════════════
    // 🎰 MAIN MENU
    // ══════════════════════════════════════

    if (!game) {
      return api.sendMessage(
`╭━━━━━━━━━━━━━━━━━━━━━━╮
┃     🎰  C A S I N O  🎰
╰━━━━━━━━━━━━━━━━━━━━━━╯

      ✦ GAME CENTER ✦

🎲 01 • BIG / SMALL
   ${prefix}casino big 500

🎴 02 • EVEN / ODD
   ${prefix}casino even 500

💸 03 • LOTTERY
   ${prefix}casino lottery 50 500

🎫 04 • DIFFERENCE
   ${prefix}casino diff 6 500

🍒 05 • SLOT MACHINE
   ${prefix}casino slot 500

╭──────────────────────╮
┃ 💰 Minimum : $50
┃ 🔒 Maximum : $20M
┃ 💵 Balance : $${money(balance)}
╰──────────────────────╯

⚡ Good luck, player!`,
        threadID,
        messageID
      );
    }

    // ══════════════════════════════════════
    // 🎲 BIG / SMALL
    // ══════════════════════════════════════

    if (game === "big" || game === "small") {
      const bet = Number(args[1]);

      if (!validateBet(bet, balance, threadID, messageID, api))
        return;

      const loading = await casinoAnim(
        api,
        threadID,
        [
          "🎲",
          "🎲  ⚡",
          "🎲  ⚡  🎲",
          "🎲  ⚡  🎲  🎲"
        ],
        450
      );

      if (!loading) return;

      const dice = Math.floor(Math.random() * 6) + 1;
      const result = dice >= 4 ? "big" : "small";
      const win = game === result;

      if (win)
        await usersData.addMoney(senderID, bet);
      else
        await usersData.subtractMoney(senderID, bet);

      const newBalance = balance + (win ? bet : -bet);

      return api.editMessage(
`╭━━━━━━〔 🎲 BIG / SMALL 〕━━━━━━╮
┃
┃ 🎯 Choice : ${game.toUpperCase()}
┃ 🎲 Dice   : ${dice}
┃ 📌 Result : ${result.toUpperCase()}
┃
┃ ${win
  ? `🎉 WINNER!\n┃ 💰 Profit : +$${money(bet)}`
  : `💔 LOSER!\n┃ 💸 Loss   : -$${money(bet)}`}
┃
┃ 💵 Balance : $${money(newBalance)}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,
        loading
      );
    }

    // ══════════════════════════════════════
    // 🎴 EVEN / ODD
    // ══════════════════════════════════════

    if (game === "even" || game === "odd") {
      const bet = Number(args[1]);

      if (!validateBet(bet, balance, threadID, messageID, api))
        return;

      const loading = await casinoAnim(
        api,
        threadID,
        [
          "🎴",
          "🎴  ➜",
          "🎴  ➜  🎴",
          "🎴  ➜  🎴  ✨"
        ],
        450
      );

      if (!loading) return;

      const number = Math.floor(Math.random() * 100);
      const result = number % 2 === 0 ? "even" : "odd";
      const win = game === result;

      if (win)
        await usersData.addMoney(senderID, bet);
      else
        await usersData.subtractMoney(senderID, bet);

      const newBalance = balance + (win ? bet : -bet);

      return api.editMessage(
`╭━━━━━━〔 🎴 EVEN / ODD 〕━━━━━━╮
┃
┃ 🎯 Choice : ${game.toUpperCase()}
┃ 🔢 Number : ${number}
┃ 📌 Result : ${result.toUpperCase()}
┃
┃ ${win
  ? `🎉 YOU WON!\n┃ 💰 Profit : +$${money(bet)}`
  : `😢 YOU LOST!\n┃ 💸 Loss   : -$${money(bet)}`}
┃
┃ 💵 Balance : $${money(newBalance)}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,
        loading
      );
    }

    // ══════════════════════════════════════
    // 💸 LOTTERY
    // ══════════════════════════════════════

    if (game === "lottery") {
      const guess = Number(args[1]);
      const bet = Number(args[2]);

      if (!Number.isInteger(guess) || guess < 0 || guess > 99) {
        return api.sendMessage(
          `❌ Guess must be between 0 and 99.

Example:
${prefix}casino lottery 55 500`,
          threadID,
          messageID
        );
      }

      if (!validateBet(bet, balance, threadID, messageID, api))
        return;

      const loading = await casinoAnim(
        api,
        threadID,
        [
          "💸",
          "💸 🔮",
          "💸 🔮 💫",
          "💸 🔮 💫 🎯"
        ],
        400
      );

      if (!loading) return;

      const result = Math.floor(Math.random() * 100);
      const win = guess === result;

      if (win)
        await usersData.addMoney(senderID, bet * 9);
      else
        await usersData.subtractMoney(senderID, bet);

      const change = win ? bet * 9 : -bet;
      const newBalance = balance + change;

      return api.editMessage(
`╭━━━━━━〔 💸 LOTTERY 〕━━━━━━╮
┃
┃ 🎯 Your Guess : ${guess}
┃ 🎲 Result     : ${result}
┃
┃ ${win
  ? `💎 JACKPOT!\n┃ 💰 Profit : +$${money(bet * 9)}`
  : `💔 MISS!\n┃ 💸 Loss   : -$${money(bet)}`}
┃
┃ 🎁 Jackpot Chance : 1 / 100
┃ 💵 Balance : $${money(newBalance)}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,
        loading
      );
    }

    // ══════════════════════════════════════
    // 🎫 DIFFERENCE
    // ══════════════════════════════════════

    if (game === "diff" || game === "difference") {
      const guess = Number(args[1]);
      const bet = Number(args[2]);

      if (!Number.isInteger(guess) || guess < 1 || guess > 6) {
        return api.sendMessage(
          `❌ Guess must be between 1 and 6.

Example:
${prefix}casino diff 6 500`,
          threadID,
          messageID
        );
      }

      if (!validateBet(bet, balance, threadID, messageID, api))
        return;

      const loading = await casinoAnim(
        api,
        threadID,
        [
          "🎫",
          "🎫 🎲",
          "🎫 🎲 🎫",
          "🎫 🎲 🎫 🎲"
        ],
        450
      );

      if (!loading) return;

      const result = Math.floor(Math.random() * 6) + 1;
      const win = guess === result;

      if (win)
        await usersData.addMoney(senderID, bet * 5);
      else
        await usersData.subtractMoney(senderID, bet);

      const change = win ? bet * 5 : -bet;
      const newBalance = balance + change;

      return api.editMessage(
`╭━━━━━━〔 🎫 DIFFERENCE 〕━━━━━━╮
┃
┃ 🎯 Your Guess : ${guess}
┃ 🎲 Dice       : ${result}
┃
┃ ${win
  ? `🏆 PERFECT HIT!\n┃ 💰 Profit : +$${money(bet * 5)}`
  : `💔 WRONG!\n┃ 💸 Loss   : -$${money(bet)}`}
┃
┃ 💵 Balance : $${money(newBalance)}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,
        loading
      );
    }

    // ══════════════════════════════════════
    // 🍒 SLOT MACHINE
    // ══════════════════════════════════════

    if (game === "slot") {
      const bet = Number(args[1]);

      if (!validateBet(bet, balance, threadID, messageID, api))
        return;

      const loading = await casinoAnim(
        api,
        threadID,
        [
          "🎰",
          "🎰  🔄",
          "🎰  🍒  🔄",
          "🎰  🍒  🍉  🔄",
          "🎰  🍒  🍉  ⭐"
        ],
        550
      );

      if (!loading) return;

      const items = [
        "🍒",
        "🍉",
        "🍊",
        "🍏",
        "🍓",
        "🍌",
        "⭐",
        "💎"
      ];

      const a = items[Math.floor(Math.random() * items.length)];
      const b = items[Math.floor(Math.random() * items.length)];
      const c = items[Math.floor(Math.random() * items.length)];

      const jackpot = a === b && b === c;
      const partial = !jackpot && (
        a === b ||
        b === c ||
        a === c
      );

      let change;
      let resultText;

      if (jackpot) {
        change = bet * 4;
        await usersData.addMoney(senderID, change);

        resultText =
`💎 MEGA JACKPOT!
┃ 💰 Profit : +$${money(change)}
┃ 🔥 5X TOTAL PAYOUT`;
      }

      else if (partial) {
        change = bet;
        await usersData.addMoney(senderID, change);

        resultText =
`✨ MATCH!
┃ 💰 Profit : +$${money(change)}
┃ 🎯 2X TOTAL PAYOUT`;
      }

      else {
        change = -bet;
        await usersData.subtractMoney(senderID, bet);

        resultText =
`💔 NO MATCH!
┃ 💸 Loss : -$${money(bet)}`;
      }

      const newBalance = balance + change;

      return api.editMessage(
`╭━━━━━━〔 🍒 SLOT MACHINE 〕━━━━━━╮
┃
┃       ${a}  ${b}  ${c}
┃
┃ ${resultText}
┃
┃ 💵 Balance : $${money(newBalance)}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,
        loading
      );
    }

    // ══════════════════════════════════════
    // ❓ UNKNOWN GAME
    // ══════════════════════════════════════

    return api.sendMessage(
`╭━━━━━━〔 ❓ UNKNOWN GAME 〕━━━━━━╮
┃
┃ 🎲 big / small
┃ 🎴 even / odd
┃ 💸 lottery
┃ 🎫 diff
┃ 🍒 slot
┃
┃ Type:
┃ ${prefix}casino
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,
      threadID,
      messageID
    );
  }
};

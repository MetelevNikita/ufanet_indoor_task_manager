import TelegramBot from "node-telegram-bot-api";

// 


declare global {
    var telegramBot: TelegramBot | undefined;
}   


const token = process.env.TG_BOT_TOKEN;

// 

export async function telegramBot () {

    if (!token) {
        throw new Error("Telegram bot token is required");
    }

    if (!globalThis.telegramBot) {
        globalThis.telegramBot = new TelegramBot(token, {
        polling: false,
        });
    }

    return globalThis.telegramBot;
    
} 


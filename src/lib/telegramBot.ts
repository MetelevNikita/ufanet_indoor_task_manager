import TelegramBot from "node-telegram-bot-api";
import { SocksProxyAgent } from "socks-proxy-agent";

// 


declare global {
    var telegramBot: TelegramBot | undefined;
}


const agent = new SocksProxyAgent(
  `socks5h://${process.env.PROXY_USER}:${process.env.PROXY_PASSWORD}@${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`,
  {
    keepAlive: false,
    timeout: 30000
  }
)


const token = process.env.TG_BOT_TOKEN;

// 

export async function telegramBot () {

    if (!token) {
        throw new Error("Telegram bot token is required");
    }

    if (!globalThis.telegramBot) {
        globalThis.telegramBot = new TelegramBot(token, {
        polling: false,
        request: {
            agent
        } as any
        });
    }

    return globalThis.telegramBot;
    
} 


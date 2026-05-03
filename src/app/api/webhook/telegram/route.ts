import { NextRequest, NextResponse } from "next/server";
import TelegramBot from 'node-telegram-bot-api'


const TOKEN = process.env.TG_BOT_TOKEN
const WEBHOOK_URL = process.env.TG_WEBHOOK_URL


export const POST = async (req: NextRequest) => {
    try {

        console.log('sadasdasd')

        const update = await req.json()

        console.log(update)


        return NextResponse.json({
            success: true,
            message: "Webhook Telegram установлен",
            data: 'data',
        });
            
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                succeess: false,
                message: 'Ошибка Вебхука Telegram',
                data: null
            })
        }

            return NextResponse.json({
                succeess: false,
                message: 'Неизвестная ошибка',
                data: null
            })
        
    }
}
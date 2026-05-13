import { NextRequest, NextResponse } from "next/server";
import TelegramBot from 'node-telegram-bot-api'


const TOKEN = process.env.TG_BOT_TOKEN
const WEBHOOK_URL = process.env.TG_WEBHOOK_URL


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        console.log('MESSAGE ', body)

        

        // MESSAGE FROM TG

        const tgMessage = `<b>Тип заказа</b> - ${body.type}\n\n\n<b>Имя</b> - ${body.name}\n\n<b>Город</b> - ${body.city}\n\n<b>Телефон</b> - ${body.phone}\n\n<b>Даьты</b> - ${new Date(body.dateStart).toLocaleDateString('ru-RU')} - ${new Date(body.dateEnd).toLocaleDateString('ru-RU')}\n\n<b>Текст</b> - ${body.text}`

        // 


        const bot = new TelegramBot(TOKEN as string)
        await bot.sendMessage(body.tgid, tgMessage, {parse_mode: 'HTML'})


        return NextResponse.json({
            success: true,
            message: "Сообщение в телеграи отправлено",
            data: 'data',
        });
            
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                succeess: false,
                message: 'Ошибка ответа от Telegram',
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
import { NextRequest, NextResponse } from "next/server";
import { telegramBot } from '@/lib/telegramBot'

// webhooks FN

import { getYGColumns } from "@/functions/yougileFnWebhook/getYGColumn";
import { getYGStickerSprint } from "@/functions/yougileFnWebhook/getYGStiackerSprint";
import { getYGUsers } from "@/functions/yougileFnWebhook/getYGUsers";


function findId (text: string) {

    const regExp = /Ваш\s*телеграм\s*id\s*\(для\s*связи\)\s*-\s*(\d+)/i

    const findId = text.match(regExp)
    console.log(findId)
    return findId
}



export const POST = async (req: NextRequest) => {
    try {


        const bot = await telegramBot()
        const data = await req.json()
        const id = findId(data.payload.title) ?? []

        if (id.length < 1) {
            console.log('Данный тип заявки не проходил через сайт zakaz.ufanet.ru')
            return NextResponse.json({
                success: false,
                message: 'Данный тип заявки не проходил через сайт zakaz.ufanet.ru',
                data: null
            })
        }

        console.log('ID ', id[1])
        


        // 
        const key = process.env.YG_API_KEY as string
        const url = process.env.YG_BASE_URL as string

        let message;

        if (data.event === 'task-created') {
            console.log('Проверка на создания новой карточки')
            const columnTask = await getYGColumns(data.payload.columnId, key, url)

            console.log(`Карточка ${data.payload.title} создана и перемещена в колонку ${columnTask.data.title as string}`)
            message = `Новая заявка \n\n\n ${data.payload.title} \n\n\n\n\n\n\n Колонка "${columnTask.data.title as string}"`

            //  Отправка пользователю

            try {
                const messageAuthor = await bot.sendMessage(id[1], message)
                console.log(`Сообщение отправлено пользователю c id ${id[1]}`)
            } catch (error: Error | any) {
                if (error.response?.statusCode === 403) {
                    console.log('Пользователь не начал диалог с ботом или заблокировал его');
                } else {
                    console.log(error.message);
                }
            }


            const messageGroup = await bot.sendMessage('-5141005635', message)
            console.log(messageGroup)

            // 


            return NextResponse.json({
                success: true,
                message: 'Карточка создана',
                data: message
            })
        }
        
        // move

        if (data.event === 'task-moved') {

            console.log('Проверяю статуст перемещения задачи')

            if (JSON.stringify(data.payload.columnId) === JSON.stringify(data.prevData.columnId)) {
            console.log('Карточка осталась на текущей доске')
            return NextResponse.json({
                success: true,
                message: 'Карточка осталась на текущей доске',
                data: null
            })
            } else {

            const newColumn = await getYGColumns(data.payload.columnId, key, url)

            if (newColumn.data.title === 'Входящие заявки с сайта ufanet.zakaz') {
            console.log('Данная колонка попадает в исключение')
            return NextResponse.json({
                success: true,
                message: 'Данная колонка попадает в исключение',
                data: null
            })
            }

            if (!newColumn.data) return newColumn.message

            console.log(`Карточка ${data.payload.title} перемещена - новая доска ${newColumn.data.title as string}`)
            message = `Карточка ${data.payload.title} \n\n\n\n\n\n\n Перемещена в "${newColumn.data.title as string}"`

            //  Отправка пользователю

            try {
                const messageAuthor = await bot.sendMessage(id[1], message)
                console.log(`Сообщение отправлено пользователю c id ${id[1]}`)
            } catch (error: Error | any) {
                if (error.response?.statusCode === 403) {
                    console.log('Пользователь не начал диалог с ботом или заблокировал его');
                } else {
                    console.log(error.message);
                }
            }

            const messageGroup = await bot.sendMessage('-5141005635', message)
            console.log(messageGroup)

            // 


            return NextResponse.json({
                success: true,
                message: 'Карточка перемещана',
                data: message
            })
        }

        }

        // user

        if (data.event === 'task-updated') {

            const prevUser = data.prevData.assigned ?? null
            const payloadUser = data.payload.assigned ?? null


            if (JSON.stringify(prevUser) === JSON.stringify(payloadUser)) {
                console.log('Данные о пользователях не изменились')
                return NextResponse.json({
                    success: true,
                    message: 'Данные о пользователях не изменились',
                    data: null
                })
            } else {
            const newUser = await getYGUsers(payloadUser, key, url)

            if (!payloadUser) return newUser.message
        
            console.log(`Назначен новый испольнитель(и) - получаю новый список ${(!payloadUser) ? "СПИСОК ПУСТ" : JSON.stringify(newUser.data.map((item: any) => item.name).join(','))}`)
            message = `Назначен новый испольнитель(и) - получаю новый список ${(!payloadUser) ? "СПИСОК ПУСТ" : JSON.stringify(newUser.data.map((item: any) => item.name).join(','))}`

            //  Отправка пользователю 

            
                try {
                    const messageAuthor = await bot.sendMessage(id[1], message)
                    console.log(`Сообщение отправлено пользователю c id ${id[1]}`)
                } catch (error: Error | any) {
                    if (error.response?.statusCode === 403) {
                        console.log('Пользователь не начал диалог с ботом или заблокировал его');
                    } else {
                        console.log(error.message);
                    }
                }
                const messageGroup = await bot.sendMessage('-5141005635', message)
                console.log(messageGroup)

            // 

            return NextResponse.json({
                success: true,
                message: 'Изменен исполнитель в карточке',
                data: message
            })
        }


        }

        // sticker sprint

        if (data.event === 'task-updated') {

            const prevSticker = data.prevData.stickers ?? null
            const payloadSticker = data.payload.stickers ?? null


            if (JSON.stringify(prevSticker) === JSON.stringify(payloadSticker)) {
                console.log('Данные стикеров не изменились')
                return NextResponse.json({
                    success: true,
                    message: 'Данные стикеров не изменились',
                    data: null
                })
        } else {
            const sticker = await getYGStickerSprint(payloadSticker, key, url)
            if (!sticker.data) return sticker.message

            const messageFromSticeker = sticker.data.map((item: {steickerName: string, currentState: {name: string, color: string}}) => {
                return `${item.steickerName} стикер изменен, новое состояние - ${item.currentState.name}`
            }).join('\n');

            //  Отправка пользователю

            try {
                const messageAuthor = await bot.sendMessage(id[1], messageFromSticeker)
                console.log(`Сообщение отправлено пользователю c id ${id[1]}`)
            } catch (error: Error | any) {
                if (error.response?.statusCode === 403) {
                    console.log('Пользователь не начал диалог с ботом или заблокировал его');
                } else {
                    console.log(error.message);
                }
            }

            const messageGroup = await bot.sendMessage('-5141005635', messageFromSticeker)

            // 

            return NextResponse.json({
                success: true,
                message: 'Изменен стикер в карточке',
                data: messageFromSticeker.join(', ')
            })
        }


        }


        return NextResponse.json({
            success: true,
            message: 'Не распознан тип передачи карточки',
            data: null
        })

    // 

        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            console.error(`Ошибка Вебхука YouGile ${error.message}`)
            return NextResponse.json({
                succeess: false,
                message: `Ошибка Вебхука YouGile ${error.message}`,
                data: null
            })
        }

            console.error(`Неизвестная ошибка ${error}`)
            return NextResponse.json({
                succeess: false,
                message: `Неизвестная ошибка ${error}`,
                data: null
            })
        
    }
}
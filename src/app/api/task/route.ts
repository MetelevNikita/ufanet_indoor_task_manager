import { NextRequest, NextResponse } from "next/server";

// 

import { postData } from "@/functions/postData";
import { getData } from "@/functions/getData";

// 

import { saveFile } from "@/lib/saveFile";

// bot

import { telegramBot } from "@/lib/telegramBot";

async function getCurrentColumns (url: string, key: number | string) {


    try {


        // Проекты

        const getProjects = await getData(
            `${url}/projects`,
            'Проекты успешно получены',
            'Ошибка получений проектов YouGile',
            key as string
        )


        if (!getProjects) {
            throw new Error('ERROR')
        }
        const currentProjects = getProjects.data.content.find((project: {title: string}) => project.title == 'Продакшн для ЖК ТВ и ПТВ')

        if (!currentProjects) {
             throw new Error(`ОШИБКА! не удалось найти нужный проект`)
        }
        
        // Доски


        const getBoards = await getData(
            `${url}/boards?projectId=${currentProjects.id}`,
            `Доски проекта ${currentProjects.title} успешно получены`,
            `Ошибка получения досок проекта ${currentProjects.title} YouGile`,
            key as string
        )

        if (!getBoards) {
            throw new Error('ERROR')
        }


        // Производство

        const currentBoardProduction = getBoards.data.content.find((board: {title: string}) => board.title === 'Производство')

        if (!currentBoardProduction) {
             throw new Error(`ОШИБКА! не удалось найти нужную доску`)
        }

        //  Колонки

        const getProductionColumns = await getData(
            `${url}/columns`,
            `Данные колонок ${currentBoardProduction.title} успешно получены`,
            `Ошибка получения колонок ${currentProjects.title} YouGile`,
            key as string
        )

        if (!getProductionColumns) {
            throw new Error('ERROR')
        }

        const сurrentColumnProduction = getProductionColumns.data.content.find((column: {title: string}) => column.title === 'Входящие заявки с сайта ufanet.zakaz') ?? {}

        if (!сurrentColumnProduction) {
             throw new Error(`ОШИБКА! не удалось найти нужную колонку`)
        }




        // Редакция


        const currentBoardEditorial = getBoards.data.content.find((board: {title: string}) => board.title === 'Выпускающая редакция')

        if (!currentBoardEditorial) {
             throw new Error(`ОШИБКА! не удалось найти нужную доску`)
        }

        //  Колонки

        const getEditorialColumns = await getData(
            `${url}/columns`,
            `Данные колонок ${currentBoardProduction.title} успешно получены`,
            `Ошибка получения колонок ${currentProjects.title} YouGile`,
            key as string
        )

        if (!getEditorialColumns) {
            throw new Error('ERROR')
        }

        const сurrentColumnEditorial = getProductionColumns.data.content.find((column: {title: string}) => column.title === 'Входящие заявки от УК') ?? {}

        if (!сurrentColumnEditorial) {
             throw new Error(`ОШИБКА! не удалось найти нужную колонку`)
        }



        const res = [
                {
                    id: 1,
                    board: currentBoardProduction.title,
                    column: {
                        title: сurrentColumnProduction.title,
                        id: сurrentColumnProduction.id
                    }
                },
                {
                    id: 2,
                    board: currentBoardEditorial.title,
                    column: {
                        title: сurrentColumnEditorial.title,
                        id: сurrentColumnEditorial.id
                    }
                }
            ]


        console.log(res)

        return {
            success: true,
            message: 'Данные колонки получены',
            data: res
        }
        
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: `Ошибка получения колонки Yougile`,
            data: null
        }
    }
}


export const POST = async (req: NextRequest): Promise<NextResponse | Error> => {
    try {


        console.log('START')

        const url = process.env.YG_BASE_URL as string
        const apiKey = process.env.YG_API_KEY as string

        // 

        const body = await req.json() as any
        const entries = Object.entries(body)


        const convertBodyEntries = await Promise.all(Object.entries(body).map(async ([key, value]) => {

            const infoData = value as {fieldName: string, data: string}

            if (typeof infoData.data === 'string' && infoData.data.startsWith('data')) {
                const data = await saveFile(infoData.data, 'logotypes')
                return [key, {fieldName: infoData.fieldName, data: data}]
            } else {
                return [key, value]
            }

        }))

        const ObjectEntries = Object.fromEntries(convertBodyEntries)

        if (ObjectEntries.length < 1) {
            return NextResponse.json({
                success: false,
                message: 'Сообщение не содержит полей',
                data: null
            })
        }

        function changeObjFromFieldYouGile(data: any): string {
            const basicMessage = data.map((item: [string, {fieldName: string, data: string}], index: number) => {
                return `${index+1})<strong>${item[1].fieldName}</strong><br><div>${item[1].data}</div>`
            })
            return ['Сообщение с сайта ufanet.zakaz<br><br>', ...basicMessage].join('<br><br>')
        }

        function changeObjFromFieldTelegram(data: any): string {
            const basicMessage = data.map((item: [string, {fieldName: string, data: string}], index: number) => {
                return `${index+1})<b>${item[1].fieldName}</b>\n${item[1].data}`
            })
            return ['Сообщение с сайта ufanet.zakaz\n\n', ...basicMessage].join('\n\n')
        }

        function changeObjFromFieldBasic(data: any): string {
            const basicMessage = data.map((item: [string, {fieldName: string, data: string}], index: number) => {
                return `${index+1})${item[1].fieldName} - ${item[1].data}`
            })

            return ['Сообщение с сайта ufanet.zakaz ', ...basicMessage].join(' ')
        }


        const basicMessage = changeObjFromFieldBasic(convertBodyEntries)
        const messageYouGile = changeObjFromFieldYouGile(convertBodyEntries)
        const messageTelegram = changeObjFromFieldTelegram(convertBodyEntries)



        // sendToYougle


        const correctColumns = await getCurrentColumns(url, apiKey) as any

        if (!correctColumns) {
            return NextResponse.json({
                success: false,
                message: 'ERROR',
                data: null
            })
        }
        const type = ObjectEntries?.typeTask?.data.split('/')[1] ?? ''
        console.log(type)


        if (type === 'Для управляющей компании') {

            const resultYGmessage = await postData(`${url}/tasks`,
                {
                    title: basicMessage,
                    columnId: correctColumns.data[1].column.id,
                    description: messageYouGile,

                },
                `Задача в YouGile успешно создана`,
                `Ошибка создания задачи в YouGile`,
                apiKey as string
            )

            if (!resultYGmessage.success) {
                throw new Error('Сетевая ошибка отправки задачи в Yougile')
            }
        } else {
            const resultYGmessage = await postData(`${url}/tasks`,
                {
                    title: basicMessage,
                    columnId: correctColumns.data[0].column.id,
                    description: messageYouGile,

                },
                `Задача в YouGile успешно создана`,
                `Ошибка создания задачи в YouGile`,
                apiKey as string
            )

            if (!resultYGmessage.success) {
                throw new Error('Сетевая ошибка отправки задачи в Yougile')
            }

        }


        // sendToTelegram

        const bot = await telegramBot()
        const botName = await bot.getMe()
        console.log(`Отправляем сообщение от имени бота`)

        const resultTGMessage = await bot.sendMessage(process.env.TG_ID_GROUP as string, messageTelegram, {parse_mode: 'HTML'})
        console.log(`Сообщение в телеграм отправлено ${resultTGMessage.message_id}`)

        return NextResponse.json({
            success: true,
            message: 'Сообщение создано',
            data: 'Заявка успешно создана'
        })
  
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            console.error(error.message)
            return NextResponse.json({
                succeess: false,
                message: `Ошибка создания заявки`,
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
import { NextRequest, NextResponse } from "next/server";

// 

import { postData } from "@/functions/postData";
import { getData } from "@/functions/getData";

// 

import { saveFile } from "@/lib/saveFile";

// bot

import { telegramBot } from "@/lib/telegramBot";

async function getCurrentColumnId (url: string, key: number | string) {


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

        const currentBoard = getBoards.data.content.find((board: {title: string}) => board.title === 'Производство')

        if (!currentBoard) {
             throw new Error(`ОШИБКА! не удалось найти нужную доску`)
        }

        //  Колонки

        const getColumns = await getData(
            `${url}/columns`,
            `Данные колонок ${currentBoard.title} успешно получены`,
            `Ошибка получения колонок ${currentProjects.title} YouGile`,
            key as string
        )

        if (!getColumns) {
            throw new Error('ERROR')
        }

        const сurrentColumn = getColumns.data.content.find((column: {title: string}) => column.title === 'Входящие заявки с сайта ufanet.zakaz') ?? {}

        if (!сurrentColumn) {
             throw new Error(`ОШИБКА! не удалось найти нужную колонку`)
        }






        return {
            success: true,
            message: 'Данные колонки получены',
            data: сurrentColumn
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

            let arr: string[] = ['Сообщение с сайта ufanet.zakaz']

            for (let item of data) {
                if (item[1] && typeof item[1] === 'object' && 'fieldName' in item[1] && 'data' in item[1]) {
                    arr.push(`<strong>${item[1].fieldName}</strong><br><div>${item[1].data}</div>`)
                } 
            }
            return arr.join('<br><br>')
        }

        function changeObjFromFieldTelegram(data: any): string {

            let arr: string[] = ['Сообщение с сайта ufanet.zakaz']

            for (let item of data) {
                if (item[1] && typeof item[1] === 'object' && 'fieldName' in item[1] && 'data' in item[1]) {
                    arr.push(`<b>${item[1].fieldName}</b>\n${item[1].data}`)
                } 
            }
            return arr.join('\n\n')
        }

        function changeObjFromFieldBasic(data: any): string {

            let arr: string[] = ['Сообщение с сайта ufanet.zakaz']

            for (let item of data) {
                if (item[1] && typeof item[1] === 'object' && 'fieldName' in item[1] && 'data' in item[1]) {
                    arr.push(`${item[1].fieldName}:${item[1].data}`)
                } 
            }
            return arr.join(' ')
        }


        const basicMessage = changeObjFromFieldBasic(convertBodyEntries)
        const messageYouGile = changeObjFromFieldYouGile(convertBodyEntries)
        const messageTelegram = changeObjFromFieldTelegram(convertBodyEntries)
    

        // sendToYougle


        const correctColumn = await getCurrentColumnId(url, apiKey)

        if (!correctColumn) {
            return NextResponse.json({
                success: false,
                message: 'ERROR',
                data: null
            })
        }


        const resultYGmessage = await postData(`${url}/tasks`,
            {
                title: basicMessage,
                columnId: correctColumn.data.id,
                description: messageYouGile,

            },
            `Задача в YouGile успешно создана`,
            `Ошибка создания задачи в YouGile`,
            apiKey as string
        )

        if (!resultYGmessage.success) {
            throw new Error('Сетевая ошибка отправки задачи в Yougile')
        }

        // sendToTelegram

        const bot = await telegramBot()
        const botName = await bot.getMe()
        console.log(`Отправляем сообщение от имени бота ${botName.first_name}`)

        const resultTGMessage = await bot.sendMessage(process.env.TG_ID_GROUP as string, messageTelegram, {parse_mode: 'HTML'})
        console.log(resultTGMessage)

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
import { NextRequest, NextResponse } from "next/server";

// 

import { postData } from "@/functions/postData";
import { getData } from "@/functions/getData";

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

        const сurrentColumn = getColumns.data.content.find((column: {title: string}) => column.title === 'Входящие заявки')

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


export const POST = async (req: NextRequest) => {
    try {

        const url = process.env.YG_BASE_URL as string
        const apiKey = process.env.YG_API_KEY as string

        // 

        const body = await req.json() as any

        // Получаем колонку youGile

        const correctColumn = await getCurrentColumnId(url, apiKey)

        if (!correctColumn) {
            return NextResponse.json({
                success: false,
                message: 'ERROR',
                data: null
            })
        }


        // Создаем Таску в Юджайл


        const createNewTask = await postData(`${url}/tasks`,
            {
                title: 'TEST',
                columnId: correctColumn.data.id,
                description: 'TEST',

            },
            `Задача в YouGile успешно создана`,
            `Ошибка создания задачи в YouGile`,
            apiKey as string
        )


        if (!createNewTask.success) {
            throw new Error('Сетевая ошибка отправки задачи в Yougile')
        }

        return NextResponse.json({
            success: true,
            message: 'Коллнка входящие найдена',
            data: correctColumn
        })


        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                succeess: false,
                message: `Ошибка создания задачи в Yougile ${error.message}`,
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
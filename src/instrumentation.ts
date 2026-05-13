import TelegramBot from 'node-telegram-bot-api'

// 

import { postData } from "./functions/postData"
import { getData } from './functions/getData'

// 

import { SocksProxyAgent } from 'socks-proxy-agent'



async function getYouGileApiKey () {


    try {
        
    const url = process.env.YG_BASE_URL as string
    const login = process.env.YG_LOGIN as string
    const password = process.env.YG_PASSWORD as string

    // company

    const getCompanys = await postData(
            `${url}/auth/companies`,
            {login: login, password: password},
            'Список компаний вашего пользователя успешно получен',
            'Ошибка получения списка пользователей'
    )

    let currentCompany = null as {id: string, name: string, isAdmin: boolean} | null;

    if (getCompanys.success === true) {
        currentCompany =  getCompanys.data.content.find((current: {id: string, name: string, isAdmin: boolean}) => current.name === 'Company')
    }

    if (!currentCompany) {
        console.error(`Ошибка получения компаний YG`)
        return `Ошибка получения компаний YG`
    }

    // keys


    const getApiKey = await postData(
        `${url}/auth/keys/get`,
        {
            login: login,
            password: password,
            companyId: currentCompany.id as string
        },
        'Данные ключей успешно получены',
        "Данные ключей не получены ошибка"
    )

    if (!getApiKey.data[0]) {
        console.log('Ключи не найдены')

        const createKey = await postData(
            `${url}/auth/keys`,
            {
                login: login,
                password: password,
                companyId: currentCompany.id as string
            },
            'Новый ключ YouGile успешно создан',
            'Ошибка создания api key YouGile'
        )

        console.log('create key ', createKey)
    }


    const key = getApiKey.data[0].key
    process.env.YG_API_KEY = getApiKey.data[0].key
    console.log('Ключ авторизации Yougile успешно сохранен')
    return {
        success: true,
        message: 'Ключ авторизации Yougile успешно сохранен',
        data: key
    }


    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                message: `Ошибка получения ключа Yougile ${error.message}`,
                data: null
            }
        }

            return {
                success: false,
                message: `Неизвестная ошибка ${error}`,
                data: null
            }
    }


}

async function createWebhookTelegram () {
    try {
        const agent = new SocksProxyAgent(`socks5://${process.env.PROXY_USER}:${process.env.PROXY_PASSWORD}@${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`)
        console.log('# Зауск вебхука TELEGRAM')

        if (!process.env.WEBHOOK_URL || !process.env.TG_BOT_TOKEN) {
            console.log('Нет входных параметров')
            return {
                success: false,
                message: 'Нет входных параметров',
                data: process.env.BOT_CREATED
            }
        }

        if (process.env.BOT_CREATED) return {
            success: false,
            message: 'Вебхук уже создан',
            data: process.env.BOT_CREATED
        }

        const bot = new TelegramBot(process.env.TG_BOT_TOKEN as string, {
            polling: true,
            request: {
                agent
            } as any
        })

        const resultBot = await bot.setWebHook(`${process.env.WEBHOOK_URL}/api/webhook/telegram` as string)
        const registredBot = await bot.getMe()

        bot.on('error', (error) => {
            console.error('Bot error:', error)
            return {
                success: false,
                message: 'Bot error:', error,
                data: null
            }
        })

        bot.on('polling_error', (error) => {
            console.error('Polling error:', error.message)
            return {
                success: false,
                message: `Polling error: ${error.message}`, 
                data: null
            }
        })

        process.env.BOT_CREATED = 'true'
        return {
            success: true,
            message: `Бот ${registredBot.first_name} успешно зарегестрирован`,
            data: resultBot
        }

        
    } catch (error: Error | unknown) {

        if (error instanceof Error) {
            return {
                success: false,
                message: `Ошибка создания вебхука телеграм ${error.message}`,
                data: null
            }
        }


        console.error(`Неизввестная ошибка ${error}`)
        return {
            success: false,
            message: `Неизввестная ошибка ${error}`
        }
    }
}

async function createWebHookYouGile () {
    try {


        console.log('# Зауск вебхука YouGile')

        const url = process.env.YG_BASE_URL as string
        const webhookUrl = process.env.WEBHOOK_URL as string
        const key = process.env.YG_API_KEY as string

        if (!url || !webhookUrl || !key) {
            console.log('asdasdasd')
            return {
                success: false,
                message: `Входные данные для создания вебхука отсутсвуют`,
                data: null
            }
        }

        // 

        const getAllWebhooks = await getData(
            `${url}/webhooks`,
            'Список подписок получен',
            'Ошибка получения списка подписок',
            key
        )


        // ####


        if (!getAllWebhooks.success) {
              return {
                success: false,
                message: `Ошибка получения данных по ключам`,
                data: null
            }
        }

        if (getAllWebhooks.data.length < 1) {

            console.log('Подписка не создана, запускаю процесс создания')
            const webhookYougile = await postData(
                `${url}/webhooks`,
                {
                    url: `${webhookUrl}/api/webhook/yougile`,
                    event: 'task-*'
                },
                'Вебхук YouGile успешно создан',
                'Ошибка создания вебхука YouGile',
                key
            )
            return {
                success: true,
                message: 'Вебхук YouGile успешно создан',
                data: `${webhookUrl}/api/webhook/yougile`
            }
        } else {
        return getAllWebhooks.data[0]
        }





        
    } catch (error: Error | unknown) {

        if (error instanceof Error) {
            return {
                success: false,
                message: `Ошибка создания вебхука YouGile ${error.message}`,
                data: null
            }
        }


        console.error(`Неизввестная ошибка ${error}`)
        return {
            success: false,
            message: `Неизввестная ошибка ${error}`
        }
    }
}

async function deleteAllWebhooks () {
    try {


        console.log('# Зауск удаления вебхука YouGile')

        const url = process.env.YG_BASE_URL as string
        const webhookUrl = process.env.WEBHOOK_URL as string
        const key = process.env.YG_API_KEY as string

        if (!url || !webhookUrl || !key) {
            console.log('asdasdasd')
            return {
                success: false,
                message: `Входные данные для создания вебхука отсутсвуют`,
                data: null
            }
        }

        const getAllWebhooks = await getData(
            `${url}/webhooks`,
            'Список подписок получен',
            'Ошибка получения списка подписок',
            key
        )

        console.log(getAllWebhooks)

        // #### Если нужно удалить подписки

        for (let item of getAllWebhooks.data) {
           const response = await fetch(`${url}/webhooks/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                },
                body: JSON.stringify({
                    deleted: true,
                    url: `${webhookUrl}/${item.id}`
                })
            })

            const data = await response.json()
            console.log('DATA DELETED ', data)
        }

        console.log('Вебхуки очищены')
        return {
            success: false,
            message: `Вебхуки очищены`,
            data: null
        }
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                message: `Ошибка очистки вебхуков ${error.message}`,
                data: null
            }
        }

            return {
                success: false,
                message: `Неизвестная ошибка ${error}`,
                data: null
            }
    }
}



async function startServices () {
    try {

        if (process.env.NEXT_RUNTIME === 'nodejs') {

        console.log('Запуск служб сервиса ufanet_indoor')
 
        const result = await Promise.all(
            [
                await getYouGileApiKey(),
                await createWebhookTelegram(),
                await deleteAllWebhooks(),
                await createWebHookYouGile()
            ]
        ).catch((error) => {
            console.log(error)
            return error
        })


        console.log(result)
        console.log('Все сервисы запущены')

        }
        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            console.error(`Ошибка запуска основных сервисов ${error.message}`)
            return
        }
        console.error(error)
        return
    }
}



startServices()


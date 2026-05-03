export async function getYGUsers(payload: any, key: string, url: string): Promise<any> {
  try {

    console.log("PAYLOAD", payload)


    if (!payload) {
      return {
        id: null,
        email: null,
        name: 'Пользователи не добавлены',
        createAt: new Date().toLocaleDateString()
      }
    }



    const users = payload.map(async (item: {id: string}) => {

      const responce = await fetch(`${url}/users/${item}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${key}`
        }
      })

      if (!responce.ok) {
        console.error('error API')
        return {
          success: false,
          message: `error API ${responce.status} - ${responce.statusText}`,
          data: null
        }
      }

      const data = await responce.json() as {id: string, email: string, realName: string, createAt: Date}
  
      return {
        id: data.id,
        email: data.email,
        name: data.realName,
        createAt: new Date().toLocaleDateString()
      }
    })

    const result = await Promise.all(users)

    return {
          success: true,
          message: `Полльзователя получены`,
          data: result
    }
 
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка получения списка пользователей ${error.message}`)
      return {
        success: false,
        message: `Ошибка получения списка пользователей ${error.message}`
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`
      }
    }
} 
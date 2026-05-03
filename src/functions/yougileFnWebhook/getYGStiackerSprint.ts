export async function getYGStickerSprint (payload: any, key: string, url: string): Promise<any> {
  try {


    if (!payload) return {
        success: false,
        message: `У задачи не созданы стикеры спринта`,
        data: null
    }


    const data = Object.entries(payload).map((item): {key: string, value: string | any} => {
      return {
        key: item[0],
        value: item[1]
        }
    })

    if (!data) return

    const dataConverted = data.map(async (item: {key: string, value: string}) => {
       
       const responce = await fetch(`${url}/string-stickers/${item.key}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application',
          "Authorization": `Bearer ${key}`
        }
      })

      if (!responce.ok) {
        console.error(`Ошибка API запроса на сервер YouGile ${responce.status} - ${responce.statusText}`)
        return {
          success: false,
          message: `Ошибка API запроса на сервер YouGile ${responce.status} - ${responce.statusText}`,
          data: null
        }
      }

      const data = await responce.json() as {name: string, states: {id: string, name: string, color: string}[]}

      if (!data) return {
          success: false,
          message: `Ошибка получения данных Стикера-спринта YouGile ${responce.status} - ${responce.statusText}`,
          data: null
      }

      const currentState = data.states.find((state) => state.id === item.value)
  

      if (!currentState) return {
          success: false,
          message: `Ошибка получения состояний Стикера-спринта YouGile ${responce.status} - ${responce.statusText}`,
          data: null
      }
      
      return {
        steickerName: data.name,
        currentState: {
          name: currentState.name,
          color: currentState.color
        }
      }




    })

    const result = await Promise.all(dataConverted)

    return {
      success: true,
      message: 'Данные спринтов получены',
      data: result
    }

  
  
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка получения стикера спринта ${error.message}`)
      return {
        success: false,
        message: `Ошибка получения стикера спринта ${error.message}`,
        data: null
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      }
    }
  
}
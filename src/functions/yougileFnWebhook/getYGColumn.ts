export async function getYGColumns (boardId: string, key: string, url: string): Promise<any> {

  try {

    const responce = await fetch(`${url}/columns/${boardId}`, {
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

    const data = await responce.json()
    return {
        success: true,
        message: `data done ${responce.status}`,
        data: data
    }


    
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка создания вебухка ${error.message}`)
      return {
        success: false,
        message: `Ошибка создания вебухка ${error.message}`
      }
    }

      console.error(`Неизвестная ошибка ${error}`)
      return {
        success: false,
        message: `Неизвестная ошибка ${error}`
      }
    }

  
}
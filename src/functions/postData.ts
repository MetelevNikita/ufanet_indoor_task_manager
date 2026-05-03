export async function postData (url: string, body: Object, doneMessage: string, errorMessage: string, key: string | null = null) {
    
    try {

        let response;


        if (!key) {

            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

        } else {

            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                },
                body: JSON.stringify(body)
            })
        }



        // if (!response.ok) {
        //     return {
        //         success: false,
        //         message: `ERROR fetch API ${response.status} - ${response.statusText}`,
        //         data: null
        //     }
        // }

        const data = await response.json()
         return {
            success: true,
            message: doneMessage,
            data: data 
        }
        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return {
                success: false,
                message: errorMessage,
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
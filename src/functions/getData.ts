
export async function getData (url: string, doneMessage: string, errorMessage: string, key: string | null = null): Promise<any> {
    try {

        let response;

        if (!key) {

        response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        } else {

            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                }
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
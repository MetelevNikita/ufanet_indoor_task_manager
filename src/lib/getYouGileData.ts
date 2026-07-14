import { getData } from "@/functions/getData"


export async function getYouGileData (url: string, key: string, id: any,  projectText: string, boardText: string, columnText: string) {
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
    
  
    
            const currentProjects = getProjects.data.content.find((project: {title: string}) => project.title == projectText)
    
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
    
            const currentBoardProduction = getBoards.data.content.find((board: {title: string}) => board.title === boardText)
            
    
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
    
            const сurrentColumnProduction = getProductionColumns.data.content.find((column: {title: string}) => column.title === columnText) ?? {}
    
            if (!сurrentColumnProduction) {
                 throw new Error(`ОШИБКА! не удалось найти нужную колонку`)
            }


            return {
                    id: id,
                    board: currentBoardProduction.title,
                    column: {
                        title: сurrentColumnProduction.title,
                        id: сurrentColumnProduction.id
                    }
                }
    
    
  
  } catch (error: Error | unknown) {

    if (error instanceof Error) {
      console.error(`Ошибка получения данных YouGileData ${error.message}`)
      return {}
    }

    console.error(`Неизвестная ошибка YouGileData ${error}`)
    return {}
    
  }
}
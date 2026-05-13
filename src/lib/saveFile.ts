import fs from 'fs'
import path from 'path'
import { buffer } from 'stream/consumers';

// uuid

import { v4 as uuidv4 } from "uuid";


export async function saveFile (base64: string, endpoint: string): Promise<any> {
    try {

        const folderId = uuidv4()

        const uploadFolder = path.resolve(process.cwd(), 'src', 'app', 'uploads', endpoint)

        if(!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder)
            console.log('Папка создана ', uploadFolder)
        }

        const endFolder = path.resolve(uploadFolder, folderId)

        if (!fs.existsSync(endFolder)) {
            fs.mkdirSync(endFolder, {recursive: true})
            console.log('Папка создана ', endFolder)
        }


        const base64String = base64.split(',')[1]
        const base64Type = base64.split(',')[0].split('/')[1].split(';')[0]

        if (!base64String) {
            throw new Error('Некорректная base64 строка');
        }


        const fileBuffer = Buffer.from(base64String, 'base64')
        fs.writeFileSync(path.resolve(endFolder, `image_${folderId}.${base64Type}`), fileBuffer)
        console.log('Файл успешно загружен')
        return `/api/uploads/${endpoint}/${folderId}/image_${folderId}.${base64Type}`

        
    } catch (error) {
        console.error(error)
        return error
    }
}
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import fs from 'fs'
import path from 'path'


export const POST = async (req: NextRequest) => {
    try {

        const {type, link} = await req.json()

        if (!type || !link) {
            return NextResponse.json({
                success: false,
                message: 'Входгные параметры пусты',
                data: null
            })
        }

        const qrDataUrl = await QRCode.toDataURL(link, {
            scale: 8
        })


        const uploadFolder = path.resolve(process.cwd(), 'src', 'app', 'uploads', type)

        const date = new Date().toISOString()

        if (!fs.existsSync(path.resolve(uploadFolder, date))) {
            fs.mkdirSync(path.resolve(uploadFolder, date), {recursive: true})
        }





        const base64String = qrDataUrl.split(',')[1];
        const buffer = Buffer.from(base64String, 'base64');

        //

        const filename = `qr_code_${Date.now()}.png`

        fs.writeFileSync(path.resolve(uploadFolder, date, filename), buffer)

        const url = `${process.env.WEBHOOK_URL}/api/uploads/${type}/${date}/${filename}`

        return NextResponse.json({
            success: true,
            message: 'Запрос прошел',
            data: url
        })
        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                succeess: false,
                message: `Ошибка создания QR CODE ${error.message}`,
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
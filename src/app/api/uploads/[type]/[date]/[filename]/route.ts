import { NextRequest, NextResponse } from "next/server";

// 

import fs from 'fs'
import path from 'path'

// 


export const GET = async (req: NextRequest, { params }: {params: {type: string, date: string, filename: string}}) => {
    try {


    const {type, date, filename } = await params

    // 
    const filePath = path.join(process.cwd(), 'src', 'app', 'uploads', type, date, filename);
    const file = await fs.readFileSync(filePath);

    const ext = path.extname(filename).toLowerCase();

    const asd = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg': ext === '.webp'
            ? 'image/webp'
            : 'application/octet-stream';


    let contentType;

    if (ext === '.png') {
        contentType = 'image/png'
    } else if (ext === '.jpg' || ext === '.jpeg') {
        contentType = 'image/jpeg'
    } else if (ext === '.webp') {
        contentType = 'image/webp'
    } else {
        return 'не подходящий тип'
    }

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
      },
    });
        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                succeess: false,
                message: `Ошибка получения данных ${error.message}`,
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
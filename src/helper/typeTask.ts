
import urQrCodeJson from '@/json/fields/uk_qrcodeField.json' with {type: 'json'}
import ukTextJson from '@/json/fields/uk_textField.json' with {type: 'json'}
import ukVideoJson from '@/json/fields/uk_videoField.json' with {type: 'json'}

// 

import businessBannerJson from '@/json/fields/business_banner.json'
import businessVideoJson from '@/json/fields/business_video.json'
import businessPhotoJson from '@/json/fields/business_photo.json'

// 

import doctorVideoJson from '@/json/fields/doctor_video.json'
import medicalVideoJson from '@/json/fields/medical_video.json'


export function currentTypeTask (direction: string): {type: string, label: string, data: any} {
    switch (direction) {
        case 'uk_text':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК / Для управляющей компании / Текстовое сообщение",
                        data: ukTextJson
                    }
        case 'uk_video':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК / Для управляющей компании / Видеоролик",
                        data: ukVideoJson
                    }
        case 'uk_qrcode':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК / Для управляющей компании / QrCode",
                        data: urQrCodeJson
                    }
        case 'business_banner':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК / Для бизнеса / VIP Баннер",
                        data: businessBannerJson
                    }
        case 'business_video':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК / Для бизнеса / Видеоролик",
                        data: businessVideoJson
                    }
        case 'business_photo':
            return {
                        type: direction,
                        label: "Фотоотчет",
                        data: businessPhotoJson
                    }
        case 'doctor_video':
            return {
                        type: direction,
                        label: "Поликлиника ТВ / Для Минздрава/Главврача",
                        data: medicalVideoJson
                    }
        case 'medical_video':
            return {
                        type: direction,
                        label: "Поликлиника ТВ / Для Бизнеса",
                        data: doctorVideoJson
                    }
        default:
            return {
                    type: 'not allow',
                    label: 'Не разспознан тип',
                    data: []
                    }
    }
}
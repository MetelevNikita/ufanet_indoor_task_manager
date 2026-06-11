
import {uk_qrcodeField} from '@/app/formField/uk_qrcodeField'
import {uk_textField} from '@/app/formField/uk_textField'
import {uk_videoField} from '@/app/formField/uk_video_field'

// 

import {businessBannerField} from '@/app/formField/business_banner'
import {businessVideoField} from '@/app/formField/business_video'
import {businessPhotoField} from '@/app/formField/business_photo'

// 

import {doctorVideoField} from '@/app/formField/doctor_video'
import {doctorSubtitleField} from '@/app/formField/doctor_subtitle'
import {medicalVideoField} from '@/app/formField/medical_video'



export function currentTypeTask (direction: string, hasVideo?: any): any {


    switch (direction) {
        case 'uk_text':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК/Для управляющей компании/Текстовое сообщение",
                        data: uk_textField()
                    }
        case 'uk_video':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК/Для управляющей компании/Видеоролик",
                        data: uk_videoField(hasVideo)
                    }
        case 'uk_qrcode':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК/Для управляющей компании/QrCode",
                        data: uk_qrcodeField()
                    }
        case 'business_banner':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК/Для бизнеса/VIP Баннер",
                        data: businessBannerField()
                    }
        case 'business_video':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК/Для бизнеса/Видеоролик",
                        data: businessVideoField()
                    }
        case 'business_photo':
            return {
                        type: direction,
                        label: "Умные экрана в ЖК/Для бизнеса/Фотоотчет",
                        data: businessPhotoField()
                    }
        case 'doctor_video':
            return {
                        type: direction,
                        label: "Поликлиника ТВ/Для Минздрава, Главврача/Видео с нуля",
                        data: doctorVideoField()
                    }
        case 'doctor_subtitle':
            return {
                        type: direction,
                        label: "Поликлиника ТВ/Для Минздрава, Главврача/Субтитрирование готового ролика",
                        data: doctorSubtitleField()
                    }
        case 'medical_video':
            return {
                        type: direction,
                        label: "Поликлиника ТВ / Для Бизнеса",
                        data: medicalVideoField()
                    }
        default:
            return {
                    type: 'not allow',
                    label: 'Не разспознан тип',
                    data: []
                    }
    }
}
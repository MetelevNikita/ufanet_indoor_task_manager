export type FieldType = "input" | "select" | "date" | "area" | "file" | "qrcode";

export type TypeInput = "text" | "tel" | "number";

export type SelectOption = {
  id: number;
  label: string;
  value: string;
};

export type FormField = {
  id: number;
  name: string;
  type: FieldType;
  title: string;
  placeholder?: string;
  subtitle?: string;
  typeInput?: TypeInput;
  arr?: SelectOption[];
  multi?: boolean;
};

export type FormConfig = {
  data: FormField[];
};



export function uk_videoField (hasVideo: string)  {

    const field: FormField[] = [
        {
        id: 1,
        name: "selfVideo",
        type: "select",
        title: "Есть ли готовый ролик?",
        placeholder: "Да/Нет",
        arr: [
            {
            id: 1,
            label: "Да",
            value: "Yes",
            },
            {
            id: 2,
            label: "Нет",
            value: "No",
            },
        ],
        multi: false,
        },
        {
        id: 2,
        name: "fio",
        type: "input",
        title: "Имя заказчика",
        placeholder: "имя",
        },
        {
        id: 3,
        name: "city",
        type: "input",
        title: "Город размещения",
        placeholder: "город",
        },
        {
        id: 4,
        name: "phone",
        type: "input",
        title: "Телефон заказчика",
        placeholder: "8 (000) 00-00-000",
        typeInput: "tel",
        },
        {
        id: 5,
        name: "date_start",
        type: "date",
        title: "Дата начала показа",
        placeholder: "дата",
        },
        {
        id: 6,
        name: "date_end",
        type: "date",
        title: "Дата окончания показа",
        placeholder: "дата",
        }
    ]


    if (hasVideo === 'Да') {
        field.push(
                {
                id: 7,
                name: "video_link",
                type: "input",
                title: "Ссылка на видео (ролик)",
                placeholder: "прикрепите ссылку на диск или файлообменник",
                },
                {
                id: 8,
                name: "video_tech_spec",
                type: "area",
                title: "Технические хорактеристики видео (1032x774.mp4)",
                placeholder: "(1032x774.mp4)",
                },
        )
    }


    if (hasVideo === 'Нет') {
        field.push(
            {
            id: 9,
            name: "title",
            type: "input",
            title: "Заголовок объявления",
            placeholder: "до 20 символов",
            },
            {
            id: 10,
            name: "duration",
            type: "input",
            title: "Хронометраж видео",
            placeholder: "Введите хронометраж видео",
            },
            {
            id: 11,
            name: "text",
            type: "area",
            title: "Основной текст",
            placeholder: "до 300 символов",
            },
            {
            id: 12,
            name: "contacts",
            type: "area",
            title: "Контактный блок",
            placeholder: "до 300 символов",
            },
            {
            id: 13,
            name: "logotype",
            type: "file",
            title: "Логотип (не обязательно)",
            placeholder: "",
            }
        )
    }

    return field

}



   
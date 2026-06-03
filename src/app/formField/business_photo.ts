export type FieldType = "input" | "select" | "date" | "area" | "file";

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



export function businessPhotoField ()  {

    const field: FormField[] = [
        {
        id: 1,
        name: "fio",
        type: "input",
        title: "Имя заказчика",
        placeholder: "имя заказчика",
        },
        {
        id: 2,
        name: "phone",
        type: "input",
        title: "Ваш телефон",
        placeholder: "8 (000) 00-00-000",
        typeInput: "tel",
        },
        {
        id: 3,
        name: "tgid",
        type: "input",
        title: "Ваш телеграм id (для связи)",
        placeholder: "0000000",
        subtitle: "Узнать ваш Telegram ID можно с помощью бота @Getmyid_Work_Bot",
        },
        {
        id: 4,
        name: "kontragent",
        type: "input",
        title: "Наименование контрагента",
        placeholder: "ООО Компания",
        },
        {
        id: 5,
        name: "date",
        type: "date",
        title: "Дата фотоотчета",
        placeholder: "дата",
        },
        {
        id: 6,
        name: "comment",
        type: "area",
        title: "Комментарий",
        placeholder: "дополнительная информация",
        },
        
    ]

    return field

}





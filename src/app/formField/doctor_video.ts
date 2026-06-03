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



export function doctorVideoField ()  {

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
        name: "name_clinic",
        type: "input",
        title: "Название поликлиники или отдела в Минздраве",
        placeholder: "Название клиники",
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
        name: "tgid",
        type: "input",
        title: "Ваш телеграм id (для связи)",
        placeholder: "0000000",
        subtitle: "Узнать ваш Telegram ID можно с помощью бота @Getmyid_Work_Bot",
        },
        {
        id: 6,
        name: "date_start",
        type: "date",
        title: "Дата начала показа",
        placeholder: "дата",
        },
        {
        id: 7,
        name: "date_end",
        type: "date",
        title: "Дата окончания показа",
        placeholder: "дата",
        },
        {
        id: 8,
        name: "description",
        type: "area",
        title: "Описание",
        placeholder: "Опишите кратко суть того, что вы хотите видеть в ролике",
        },
        {
        id: 9,
        name: "logotype",
        type: "file",
        title: "Логотип (не обязательно)",
        placeholder: "",
        },
        
    ]

    return field

}





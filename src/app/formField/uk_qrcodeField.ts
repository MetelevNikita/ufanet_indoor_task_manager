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



export function uk_qrcodeField ()  {

    const field: FormField[] = [
        {
      id: 1,
      name: "fio",
      type: "input",
      title: "Имя заказчика",
      placeholder: "имя",
    },
    {
      id: 2,
      name: "city",
      type: "input",
      title: "Город размещения",
      placeholder: "город",
    },
    {
      id: 3,
      name: "phone",
      type: "input",
      title: "Телефон заказчика",
      placeholder: "8 (000) 00-00-000",
      typeInput: "tel",
    },
    {
      id: 4,
      name: "qrcode",
      type: "qrcode",
      title: "ссылка на чат дома/сайт УК",
      placeholder: "https://example.com",
    },
    ]

    return field

}





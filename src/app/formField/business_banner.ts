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



export function businessBannerField ()  {

    const field: FormField[] = [
        {
          id: 1,
          name: "fio",
          type: "input",
          title: "Менеджер Уфанет",
          placeholder: "имя менеджера",
        },
        {
          id: 2,
          name: "phone_meneger",
          type: "input",
          title: "Телефон менеджера",
          placeholder: "8 (000) 00-00-000",
          typeInput: "tel",
        },
        {
          id: 3,
          name: "tgid",
          type: "input",
          title: "Телеграм id (для связи)",
          placeholder: "Телеграм id менеджера (000000000)",
          subtitle: "Узнать ваш Telegram ID можно с помощью бота @Getmyid_Work_Bot",
        },
        {
          id: 4,
          name: "city",
          type: "input",
          title: "Город размещения",
          placeholder: "город",
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
        },
        {
          id: 8,
          name: "typeClient",
          type: "select",
          title: "Какой тип клиента? (выбрать один)",
          placeholder: "",
          arr: [
            {
              id: 1,
              label: "Районный (ищет трафик в 1-м районе)",
              value: "district",
            },
            {
              id: 2,
              label: "Городской (ищет трафик по всему городу)",
              value: "city",
            },
          ],
          multi: false,
        },
        {
          id: 9,
          name: "typeProduct",
          type: "input",
          title: "Какой продукт / услугу рекламируем? (напишите)",
          placeholder:
            "Укажите конкретный продукт, а не компанию в целом. Пример: «Доставка суши», «Стоматология у дома»",
        },
        {
          id: 10,
          name: "targetClient",
          type: "select",
          title: "Кто целевой клиент в этом ЖК? (выбрать один)",
          placeholder: "",
          arr: [
            {
              id: 1,
              label: "Семьи с детьми",
              value: "family",
            },
            {
              id: 2,
              label: "Только Женщины",
              value: "wooman",
            },
            {
              id: 3,
              label: "Только Мужчины",
              value: "men",
            },
            {
              id: 4,
              label: "Молодые холостяки",
              value: "bachelor",
            },
            {
              id: 5,
              label: "Любой житель",
              value: "any people",
            },
          ],
          multi: false,
        },
        {
          id: 11,
          name: "benefit",
          type: "area",
          title: "Главная выгода баннера (1 предложение)?",
          placeholder:
            "Пример: «Кофе в 1 минуте от подъезда», «Распродажа на ассортимент», «Ремонт телефона за 15 минут»",
        },
        {
          id: 12,
          name: "benefit_dop",
          type: "input",
          title:
            "Будем ли дополнять Главную выгоду - акцией, промокодом, скидкой, спецпредложением?",
          placeholder: "Пример: «Скидка 20% до конца месяца», «Первое занятие бесплатно»",
        },
        {
          id: 13,
          name: "result",
          type: "select",
          title: "Какое действие должен совершить человек после просмотра баннера",
          placeholder: "Введите текст",
          arr: [
            {
              id: 1,
              label: "Прийти в точку",
              value: "come to the point",
            },
            {
              id: 2,
              label: "Заказать онлайн",
              value: "order online",
            },
            {
              id: 3,
              label: "Отсканировать QR",
              value: "scan qr",
            },
            {
              id: 4,
              label: "Позвонить",
              value: "call",
            },
            {
              id: 5,
              label: "Просто запомнить бренд",
              value: "remember brand",
            },
          ],
          multi: false,
        },
        {
          id: 14,
          name: "organization",
          type: "input",
          title: "Наименование организации/бренда",
          placeholder: "ООО Компания",
        },
        {
          id: 15,
          name: "fio_client",
          type: "input",
          title: "ФИО представителя компании",
          placeholder: "фио",
        },
        {
          id: 16,
          name: "phone_doctor",
          type: "input",
          title: "Номер представителя компании",
          placeholder: "8(000)00-00-000",
          typeInput: "tel",
        },
        {
          id: 17,
          name: "agreement",
          type: "input",
          title: "Договор",
          placeholder: "Номер договора",
        },
        {
          id: 18,
          name: "payment",
          type: "select",
          title: "Договор подписан и оплачен",
          placeholder: "Номер договора",
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
          id: 19,
          name: "inn",
          type: "input",
          title: "ИНН",
          placeholder: "Введите ИНН",
          typeInput: "number",
        },
        {
          id: 20,
          name: "ogrn",
          type: "input",
          title: "ОГРН",
          placeholder: "Введите ОГРН",
          typeInput: "number",
        },
        
    ]

    return field

}





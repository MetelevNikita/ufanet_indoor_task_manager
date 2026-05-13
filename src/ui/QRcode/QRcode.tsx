"use client";

import { FC } from "react";

// styles

import styles from "./QRcode.module.css";

// components

import Button from "../Button/Button";

interface QRcodeProps {
  title: string;
  value: string;
  placeholder: string;
  onChange: (e: any) => any;
  qrCodeData: any;
}

const QrCode: FC<QRcodeProps> = ({
  title,
  value,
  placeholder,
  onChange,
  qrCodeData,
}) => {
  const { qrCodePath, setQrCodePath } = qrCodeData;

  async function generateQrCodeHandler(type: string, value: string) {
    try {
      if (!value || value.length < 1) {
        alert("Поле не может быть пустым");
        return;
      }

      if (!value.startsWith("https://")) {
        alert(
          "ссылка на сайт на валидна (ссылка должна начинаться с https://)",
        );
        return;
      }

      const response = await fetch("/api/qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: type, link: value }),
      });

      if (!response.ok) {
        throw new Error(
          `Оишбка запроса ${response.status} - ${response.statusText}`,
        );
      }

      const data = await response.json();
      setQrCodePath(data.data);
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return (
    <div className={styles.qrcode_container}>
      <span className={styles.qrcode_title}>{title}</span>
      <input
        placeholder={placeholder}
        className={styles.qrcode}
        value={value}
        onChange={onChange}
      />

      <Button
        text={"Сгенерировать QR code"}
        onClick={() => {
          generateQrCodeHandler("qrcodes", value);
        }}
      />

      <div className={styles.qrcode_image_wrapper}>
        {qrCodePath && (
          <img className={styles.qrcode_image} src={qrCodePath} alt="qrcode" />
        )}
      </div>
    </div>
  );
};

export default QrCode;

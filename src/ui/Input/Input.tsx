import { FC } from 'react'
import Link from 'next/link'

// styles

import styles from './Input.module.css'
import { div } from 'motion/react-client'

// 

interface InputProps {
    title: string
    value: string
    placeholder: string
    onChange: (e: any) => any
    error?: boolean
    name?: string
    subtitle?: string
}

const Input: FC<InputProps> = ({ title, value, placeholder, onChange, error, name, subtitle }) => {



    const subtitleData = subtitle?.split(' ')
    const start = subtitleData?.slice(0, 8).join(' ')
    const end = subtitleData?.slice(-1).join(' ').slice(1)

    function textGenerator (value: string | null, type: string) {

      if (!value) {
        return ''
      }

      if (type === 'phone') {
        const digits = value.replace(/\D/g, '').slice(0, 11)

        if (!digits) return '';

        let result = '';

        if (digits[0] === '7') {
          result = '+7';
        } else if (digits[0] === '8') {
          result = '8';
        } else {
          result = digits[0];
        }

        if (digits.length > 1) {
          result += ` (${digits.slice(1, 4)}`;
        }

        if (digits.length >= 4) {
          result += ')';
        }

        if (digits.length > 4) {
          result += ` ${digits.slice(4, 7)}`;
        }

        if (digits.length > 7) {
          result += `-${digits.slice(7, 9)}`;
        }

        if (digits.length > 9) {
          result += `-${digits.slice(9, 11)}`;
        }

        return result;
      }

      if (type === 'inn') {
        return value.slice(0,12)
      }

      if (type === 'ogrn') {
        return value.slice(0,15)
      }

      return value

      
    }


  return (
    <div className={styles.input_container}>
        <span className={styles.input_title}>{title}</span>
        <input
          type={(name === 'phone') ? 'tel' : 'text'}
          autoComplete={(name === 'phone') ? 'tel' : undefined }
          style={(error) ? {borderColor: 'red'} : {borderColor: '#E9E9E9'}}
          placeholder={placeholder}
          className={styles.input}
          value={(name) ? textGenerator(value, name) : value}
          onChange={onChange}
          onFocus={(e) => {
            e.target.style = 'border-color: #e9e9e9;'
          }}
          required

        />

        {
          (subtitle) && (
            <div className={styles.input_subtitle_container}>
              <span className={styles.input_subtitle_text}>{start}</span>
              <Link className={styles.input_subtitle_link} href={`https://t.me/${end}`}>@{end}</Link>
            </div>
          )
        }


          
    </div>
  )
}

export default Input
import { FC } from 'react'

// styles

import styles from './Input.module.css'

// 

interface InputProps {
    title: string
    value: string
    placeholder: string
    onChange: (e: any) => any
    error?: boolean
    typeInput?: string
}

const Input: FC<InputProps> = ({ title, value, placeholder, onChange, error, typeInput }) => {

  return (
    <div className={styles.input_container}>
        <span className={styles.input_title}>{title}</span>
        <input
          type={(!typeInput) ? 'text' : typeInput}
          autoComplete={(typeInput === 'tel') ? typeInput : undefined }
          style={(error) ? {borderColor: 'red'} : {borderColor: '#E9E9E9'}}
          placeholder={placeholder}
          className={styles.input}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            e.target.style = 'border-color: #e9e9e9;'
          }}
          required

        />
          
    </div>
  )
}

export default Input
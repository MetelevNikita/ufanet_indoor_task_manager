import { FC } from 'react'

// styles

import styles from './Input.module.css'

// 

interface InputProps {
    title: string
    value: string
    placeholder: string
    onChange: (e: any) => any
}

const Input: FC<InputProps> = ({ title, value, placeholder, onChange }) => {
  return (
    <div className={styles.input_container}>
        <span className={styles.input_title}>{title}</span>
        <input placeholder={placeholder} className={styles.input} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input
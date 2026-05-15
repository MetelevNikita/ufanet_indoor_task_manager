import { FC } from 'react'

// styles

import styles from './Date.module.css'

// 

interface DateProps {
    title: string
    value: string
    placeholder: string
    onChange: (e: any) => any
}

const DateInput: FC<DateProps> = ({ title, value, placeholder, onChange }) => {

  const minDay = new Date().setDate(new Date().getDate()+5)
  const min = new Date(minDay).toISOString().split('T')[0]

  return (
    <div className={styles.date_container}>
        <span className={styles.date_title}>{title}</span>
        <input min={min} type='date' placeholder={placeholder} className={styles.date} value={value} onChange={onChange}/>
    </div>
  )
}

export default DateInput
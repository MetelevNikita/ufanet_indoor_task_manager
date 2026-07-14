import { FC } from 'react'
import styles from './Date.module.css'

interface DateProps {
  title: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DateInput: FC<DateProps> = ({ title, value, placeholder, onChange }) => {
  const date = new Date()
  date.setDate(date.getDate() + 3)

  const min = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  return (
    <div className={styles.date_container}>
      <span className={styles.date_title}>{title}</span>
      <input
        min={min}
        type="date"
        placeholder={placeholder}
        className={styles.date}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default DateInput
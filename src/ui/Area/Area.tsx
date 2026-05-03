import { FC } from 'react'

// style

import styles from './Area.module.css'

// 

interface AreaProps {
    title: string
    rows: number
    value: string
    onChange: (e: any) => void
    

}

// 

const Area: FC<AreaProps> = ({ title, rows, value, onChange }) => {
  return (
    <div className={styles.area_container}>

        <span className={styles.area_title}>{title}</span>
        <textarea
            rows={rows} 
            className={styles.area_input} 
            value={value} 
            onChange={onChange} />

    </div>
  )
}

export default Area
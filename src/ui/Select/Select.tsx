import { FC } from 'react'

// 

import styles from './Select.module.css'



interface SelectProps {
    title: string
    arr: any[]
    value: any
    onChange: (e: any) => any
    data: any

}


const Select: FC<SelectProps> = ({ title, arr, value, onChange, data }) => {

    console.log(data)

  return (
    <div className={styles.select_container}>

        <span className={styles.select_title}>{title}</span>
        <select className={styles.select_input} name={value} id={value} onChange={onChange}>
            {
                arr.map((opt, index) => {
                    return (
                        <option key={index} className={styles.select_option}>{opt.label}</option>
                    )
                })
            }
        </select>

        {/*  */}

        <div className={styles.checked_wrapper}>

        {
            (data.length > 1) && data.map((item: string, index: number) => {
                return (
                    <div key={index} className={styles.select_checked_item}>{item}</div>
                )
            })
        }

        </div>

        {/*  */}

    </div>
  )
}

export default Select
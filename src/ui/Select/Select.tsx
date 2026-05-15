import { FC, useState } from 'react'

// 

import styles from './Select.module.css'

// 


import Input from '../Input/Input'



interface SelectProps {
    title: string
    arr: any[]
    value: any
    onChange: (e: any) => any
    data: any
    state: any
    name: string


}


const Select: FC<SelectProps> = ({ title, arr, value, onChange, data, state, name }) => {

    const {dataForm, setDataForm} = state
    const fieldValue = dataForm[name]
    const fieldData = fieldValue?.data[0] ?? ''

    return (
        <div className={styles.select_container}>

            <span className={styles.select_title}>{title}</span>
            <select className={styles.select_input} name={value} id={value} onChange={onChange}>
                <option>{'выберите значение'}</option>
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
                (data && data.length >= 1) && data.map((item: string, index: number) => {
                    return (
                        <div key={index} className={styles.select_checked_item}>{item}</div>
                    )
                })
            }

            </div>

            <div className={styles.other_wrapper}>
                {

                    (fieldData === 'Другое') && (
                        <Input title={`${fieldValue.fieldName} (Другое)`} value={dataForm.other?.data} placeholder={''} onChange={
                            (e) => {
                                setDataForm({...dataForm, ['other']: {fieldName: `${fieldValue.fieldName} (Другое)`, data: e.target.value}})
                            }
                        }/>
                    )

                }
            </div>

             

        </div>
    )
}

export default Select
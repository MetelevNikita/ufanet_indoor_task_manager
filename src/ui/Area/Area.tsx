import { FC, useEffect, useState } from 'react'

// style

import styles from './Area.module.css'

// 

interface AreaProps {
    title: string
    placeholder: string
    rows: number
    value: string
    onChange: (e: any) => void
    control?: boolean
    max?: number
    error: boolean
    

}

// 

const Area: FC<AreaProps> = ({ title, placeholder, rows, value, onChange, control=false, max=0, error }) => {

  


  const maxLetter = max
  const [letter, setLetter] = useState<number>(0)


  useEffect(() => {

    if (value) {
      setLetter(value.length)
    }
    
  }, [value])


  return (
    <div className={styles.area_container}>

        <span className={styles.area_title}>{title}</span>
        <textarea
            placeholder={placeholder}
            rows={rows} 
            className={styles.area_input} 
            value={value} 
            onChange={onChange}
            maxLength={maxLetter}
            style={(error) ? {borderColor: '#c70f0f'} : (letter === maxLetter) ? {borderColor: '#c70f0f'} : {borderColor: '#E9E9E9'}}
          />

          <div className={styles.area_counter}>
            {
              (control) && (
                

                (letter === maxLetter) ? (<div className={styles.area_title}>Достигнул лимит букв: {letter}</div>) : (<div className={styles.area_title}>{letter}</div>)
                
              )
            }
          </div>

    </div>
  )
}

export default Area
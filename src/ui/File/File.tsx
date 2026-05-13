
import { FC, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image';

// styles

import styles from './File.module.css'

// icon

import { BsArrowBarDown } from "react-icons/bs";


interface FileProps {
    title: string
    placeholder: string
    value: string
    onChange: (e: any) => any
    data: any
    name: string
}

const File: FC<FileProps> = ({ title, name, placeholder, value, onChange, data }) => {

    const [image, setImage] = useState<string | null>(null)


    useEffect(() => {
            if (!data) return
            setImage(data)
    }, [value])


  return (
    
    <div className={styles.file_container}>

        <span className={styles.file_title}>{title}</span>
        <label className={styles.file_label} htmlFor={name}>
            <motion.div initial={{rotate: -90}} whileTap={{scale: 1.1}} whileHover={{rotate: 0}} className={styles.file_button_wrapper}>
                <BsArrowBarDown className={styles.file_button_icon}/>
            </motion.div>

            <input className={styles.file_input} name={name} id={name} type={'file'} onChange={onChange}/>
            <div className={styles.file_placeholder}>{(data) ? data.name : placeholder}</div>
        </label>


        <div>
            {
                (image) && (
                    <div className={styles.preview_image_wrapper}>
                        <img className={styles.preview_image_wrapper} src={image} alt='image'/>
                    </div>
                )
            }
        </div>

        
    </div>
  )
}

export default File
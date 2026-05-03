
import { FC, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image';

// styles

import styles from './File.module.css'

// icon

import { BsArrowBarDown } from "react-icons/bs";
import { div } from 'motion/react-client';

interface FileProps {
    title: string
    placeholder: string
    value: string
    onChange: (e: any) => any
    data: any
}

const File: FC<FileProps> = ({ title, placeholder, value, onChange, data }) => {

    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        const ext = data?.type.split('/')[1] ?? ''

        if (ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'tiff') {
            const previewImage = URL.createObjectURL(data)
            setImage(previewImage)
        }
    }, [value])







  return (
    
    <div className={styles.file_container}>

        <span className={styles.file_title}>{title}</span>
        <label className={styles.file_label} htmlFor='file'>
            <motion.div initial={{rotate: -90}} whileTap={{scale: 1.1}} whileHover={{rotate: 0}} className={styles.file_button_wrapper}>
                <BsArrowBarDown className={styles.file_button_icon}/>
            </motion.div>

            <input className={styles.file_input} id={'file'} type={'file'} onChange={onChange}/>
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
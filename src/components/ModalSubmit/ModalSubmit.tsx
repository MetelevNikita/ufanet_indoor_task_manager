import { FC } from 'react'
import Image from 'next/image'

// styles

import styles from './ModalSubmit.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// components

import Button from '@/ui/Button/Button'


interface ModalSubmitProps {
    icon: React.ReactNode
    title: "Успешно" | "Ошибка" | "Предуп"
    description: string
    onClick: () => void
}

const ModalSubmit: FC<ModalSubmitProps> = ({ icon, title, description, onClick }) => {
  return (

        <div className={styles.modal_bg_container}>

                <div className={styles.modal_submit_container}>


                        
                        
                        {
                            (icon) && <div>{icon}</div>
                        }

                        <div className={styles.modal_submit_title}>{title}</div>
                        <span className={styles.modal_submit_description}>{description}</span>

                        <Button text={'продолжить'} onClick={onClick} />
                </div>
        </div>

  )
}

export default ModalSubmit
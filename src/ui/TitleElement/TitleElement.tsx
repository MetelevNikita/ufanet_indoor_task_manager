'use client'

import { FC, useContext } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { TitleContext } from '@/app/(main)/layout'

// styles

import styles from './TitleElement.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// 

interface TitleElementProps {
    title: string
    subtitle: string
}

// 

const TitleElement: FC<TitleElementProps> = ({ subtitle }) => {

    const {title, setTitle} = useContext(TitleContext) as {title: string, setTitle: (e: any) => void}
    const router = useRouter()

  return (
        <Row className='d-flex justify-content-center align-items-center mt-3'>
            <Col md={5} className={'d-flex justify-content-end align-items-center'}>
                <motion.div
                    style={{ transformOrigin: 'bottom right' }}
                    className={styles.title}
                    whileHover={{scale: 1.1, backgroundColor: '#ff7733'}}
                    initial={{rotate: -20, opacity: 0, scale: 0.5}}
                    animate={{rotate: 0, opacity: 1, scale: 1}}
                    transition={{
                        duration: 0.5,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }
                        
                    }}
                    onClick={() => {
                        router.push('/')
                    }}
                >
                        {(title) ? title : "Заказ Уфанет"}
                </motion.div>
            </Col>

            <Col md={4}>
                <motion.div className={styles.subtitle}>{subtitle}</motion.div>
            </Col>
        </Row>
  )
}

export default TitleElement
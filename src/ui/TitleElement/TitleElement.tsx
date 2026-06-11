'use client'

import { FC, useContext, Activity } from 'react'
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
        <Row className='d-flex justify-content-center align-items-center'>

            <Col md={12} className='mt-1 mb-1 d-flex justify-content-center align-items-center'>
                <motion.div className={styles.title}>{subtitle}</motion.div>
            </Col>

            {/*  */}


            <Col md={12} className={'d-flex justify-content-center align-items-center mt-3 mb-3'}>
                <Activity mode={title ? "visible" : "hidden"}>
                    <div className={styles.navigation}>Вы находитесь во вкладке: {title}</div>
                </Activity>
            </Col>
        </Row>
  )
}

export default TitleElement
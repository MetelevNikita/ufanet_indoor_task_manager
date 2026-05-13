'use client'

import { FC } from 'react'
import Image from 'next/image'

// styles

import styles from './FAQ.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components


// img

import qrcode from '@/../public/app/qrcode_bot/qr_code_1778056016606.png'
import { div } from 'motion/react-client'

const FAQ: FC = () => {
  return (


    <Container>


        <Row className={[styles.faq_container, 'd-flex justify-content-center align-items-center mb-4'].join(' ')}>


                    <Col md={3} className='d-flex justify-content-center align-items-center'>
                        <div>
                            <Image className={styles.faq_image} src={qrcode} alt={'img'} width={400}/>
                        </div>
                    </Col>

                    <Col md={6} className='d-flex justify-content-center align-items-center'>
                        <div className={styles.faq_wrapper}>
                            <div className={styles.faq_text}>Внимание! для того что бы получать уведомления о статусе вашей заявке вам необходиом подписаться на бота для рассылке <a href="https://t.me/ufanet_indoor_bot" target='_blank'>@ufanet_indoor_bot</a></div>
                        </div>
                    </Col>

        </Row>

    </Container>

  )
}

export default FAQ
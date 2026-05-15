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


                    <Col md={3} className='d-flex justify-content-center align-items-center mt-2 mb-2'>
                        <div>
                            <Image className={styles.faq_image} src={qrcode} alt={'img'} width={400}/>
                        </div>
                    </Col>

                    <Col md={6} className='d-flex justify-content-center align-items-center text-md-start text-center mt-2 mb-2'>
                            <div className={styles.faq_text}>Внимание! Для того чтобы получать уведомления о статусе вашей заявки, вам необходимо подписаться на бота для рассылки. <a href="https://t.me/ufanet_indoor_bot" target='_blank'>@ufanet_indoor_bot</a></div>
                    </Col>

        </Row>

    </Container>

  )
}

export default FAQ
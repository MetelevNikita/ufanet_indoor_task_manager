'use client'

import { FC, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'

// context

import { ModalSubmitActive } from './layout'



// styles

import styles from './page.module.css'


// 

import { Container, Row, Col } from 'react-bootstrap'

// components

import MenuButton from '@/ui/MenuButton/MenuButton'
import InfoTitle from '@/ui/InfoTitle/InfoTitle'


// image


import { FaTv } from "react-icons/fa6";
import { MdOutlineMedicalServices } from "react-icons/md";



const page: FC = () => {

const router = useRouter()

  return (
    <Container>

        <InfoTitle title={'Для кого будущий заказ?'} />

        <Row className={'d-flex justify-content-center align-items-center'}>
            <Col md={4}>
                <MenuButton
                    title={'Умные экраны в ЖК'}
                    subtitle={'Разместить QR code или рекламный ролик'}
                    icon={<FaTv className={styles.menu_button_icon}/>}
                    onClick={() => {
                        router.push('/smartscreen')
                    }}
                />
            </Col>


            <Col md={4}>
                <MenuButton
                    title={'Поликлиника ТВ'}
                    subtitle={'Разместите рекламный ролик в поликлиниках вашего города'}
                    icon={<MdOutlineMedicalServices className={styles.menu_button_icon}/>}
                    onClick={() => {
                        router.push('/clinic')
                    }}
                />
            </Col>
        </Row>

    </Container>
  )
}

export default page
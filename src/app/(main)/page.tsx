'use client'

import { FC, useContext } from 'react'
import { useRouter } from 'next/navigation'

// context

import { TitleContext } from './layout'



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

const {title, setTitle} = useContext(TitleContext) as any

  return (
    <Container>

        <InfoTitle title={'Для кого будущий заказ?'} />

        <Row className={'d-flex justify-content-center align-items-center'}>
            <Col md={4} className='d-flex justify-content-center mt-2 mb-2'>
                <MenuButton
                    title={'Умные экраны в ЖК'}
                    subtitle={''}
                    icon={<FaTv className={styles.menu_button_icon}/>}
                    onClick={() => {
                        setTitle('Умные экраны в ЖК')
                        router.push('/smartscreen')
                    }}
                />
            </Col>


            <Col md={4} className='d-flex justify-content-center mt-2 mb-2'>
                <MenuButton
                    title={'Поликлиника ТВ'}
                    subtitle={''}
                    icon={<MdOutlineMedicalServices className={styles.menu_button_icon}/>}
                    onClick={() => {
                        setTitle('Поликлиника ТВ')
                        router.push('/clinic')
                    }}
                />
            </Col>
        </Row>

    </Container>
  )
}

export default page
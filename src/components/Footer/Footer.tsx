'use client'

import { FC } from 'react'
import Link from 'next/link';

// styles

import styles from './Footer.module.css'

// icon

import { FaGithub } from "react-icons/fa6";

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// 

const Footer: FC = () => {
  return (
    <Container>
        <Row className='mt-3 mb-3 justify-content-between'>

            <Col md={4} xs={12} className='d-flex justify-content-md-start justify-content-center align-items-center'>
                <p className={styles.footer_rights}>&#169; Все права защищены</p>
            </Col>

            <Col md={3} xs={12} className='d-flex justify-content-center align-items-center'>
                <FaGithub className={styles.footer_icon}/>
                <Link className={styles.footer_link} target='_blank' href={'https://github.com/metelevnikita'}>разработчик</Link>
            </Col>

            <Col md={4} xs={12} className='d-flex justify-content-md-end justify-content-center align-items-center'>
                <div onClick={() => {
                }}>техническая поддержка</div>
            </Col>


        </Row>
    </Container>
  )
}

export default Footer
import { FC } from 'react'

// style

import styles from './InfoTitle.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

interface InfoTitleProps {
    title: string
}

const InfoTitle:FC<InfoTitleProps> = ({ title }) => {
  return (
    <Container>
        <Row>
            <Col className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                <div className={styles.title}>{title}</div>
            </Col>
        </Row>
    </Container>
  )
}

export default InfoTitle
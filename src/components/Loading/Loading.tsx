import {FC} from 'react'

// styles

import styles from './Loading.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// 

interface LoadingProps {
    text: string
}

const Loading: FC<LoadingProps> = ({text}) => {
  return (
    <Container>
        <Row className='mb-5 mt-5'>

            <Col className={'d-flex justify-content-center align-items-center'}>
                <div className={styles.text}>{text}</div>
            </Col>

        </Row>
    </Container>
  )
}

export default Loading
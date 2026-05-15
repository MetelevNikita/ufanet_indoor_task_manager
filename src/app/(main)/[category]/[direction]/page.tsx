
// bootstrap

import { Container, Row } from 'react-bootstrap'

// components

import MenuButtonsBlock from '@/components/MenuButtonsBlock/MenuButtonsBlock'
import Form from '@/components/Form/Form'

// json

import directionMenuJson from '@/json/directionNavigation.json'

const page = async ({ params }: { params: {direction: string} }) => {

const { direction } = await params

console.log('DIRECTIONS ', direction)

const currentDirections = directionMenuJson.filter((item) => item.type === direction) || []

  return (
    <Container>

        <Row className={'d-flex justify-content-center align-items-center'}>

            {
                (currentDirections.length < 1) ? (<Form endpoint={direction}/>) : (<MenuButtonsBlock data={currentDirections} category={direction}/>)
            }

        </Row>

    </Container>
  )
}

export default page

// bootstrap

import { Container, Row } from 'react-bootstrap'

// components

import MenuButtonsBlock from '@/components/MenuButtonsBlock/MenuButtonsBlock'
import InfoTitle from '@/ui/InfoTitle/InfoTitle'

// json

import categroyMenuJson from '@/json/categoryNavigation.json' with {type: 'json'}

const page = async ({ params }: { params: {category: string} }) => {
    
    const { category } = await params
    const currentMenuCategory = categroyMenuJson.filter((item: {id: number, type: string, title: string, subtitle: string, endpoint: string}) => item.type === category)


  return (
    <Container>
        
        <InfoTitle title={'Выберите направление'} />


        {/*  */}


        <Row className={'d-flex justify-content-center align-items-center'}>
            <MenuButtonsBlock data={currentMenuCategory} category={category}/>
        </Row>

    </Container>
  )
}

export default page
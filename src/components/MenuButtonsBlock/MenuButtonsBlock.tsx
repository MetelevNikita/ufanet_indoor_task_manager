
'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'

// 

// bootstrap

import { Row, Col } from 'react-bootstrap'

// components

import MenuButton from '@/ui/MenuButton/MenuButton'



interface MenuButtonsBlockProps {
    data: {id: number, type: string, title: string, subtitle: string, endpoint: string}[]
    category: string
}

const MenuButtonsBlock: FC<MenuButtonsBlockProps> = ({ data, category }) => {

    const router = useRouter()


  return (
    <Row className={'d-flex justify-content-center align-items-center mt-5'}>
        {
            (data.length < 1) ? (
            <Col>
                <div>
                    Нет элементов меню
                </div>
            </Col>
            
            ) : 
            
            (
                data.map((item: {id: number, title: string, subtitle: string, endpoint: string}, index: number): React.ReactNode => {
                    return (
                        <Col md={4} key={index}>
                            <MenuButton title={item.title} subtitle={item.subtitle} icon={''} onClick={() => {
                                router.push(`/${category}/${item.endpoint}`)
                            }} />
                        </Col>
                    )
                })
            )
        }
    </Row>
  )
}

export default MenuButtonsBlock
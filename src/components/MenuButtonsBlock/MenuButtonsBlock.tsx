
'use client'

import { FC, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// context

import { TitleContext } from '@/app/(main)/layout'

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
const {title, setTitle} = useContext(TitleContext) as any

useEffect(() => {
    if (!title) {
        setTitle('Заказ Уфанет')
    }
}, [title])

console.log(title)

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
                        <Col md={4} key={index} className='d-flex justify-content-center mt-2 mb-2'>
                            <MenuButton title={item.title} subtitle={item.subtitle} icon={''} onClick={() => {
                                console.log(item.title)
                                setTitle(`${title}/${item.title}`)
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
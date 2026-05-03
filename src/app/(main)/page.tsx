'use client'

import { FC, useState } from 'react'

// 

import { Container, Row, Col } from 'react-bootstrap'

// components

import Button from '@/ui/Button/Button'

// class

import { FieldClassInput, FieldClassSelector, FieldClassFile } from '@/module/classField'

// data

import dataField from '@/json/dataField.json' with {type: 'json'}





const page: FC = () => {


    const [data, setData] = useState<Record<string, any>>({})


  return (
    <Container>
        <Row className='d-flex flex-column'>

            {

                (dataField) && (
                    dataField.data.map((item, index) => {
                        
                        if (item.type === 'input') {
                            return new FieldClassInput(
                                    item.id,
                                    item.name,
                                    item.placeholder,
                                    item.title,
                                    item.type
                                ).createField(
                                    data[item.name],
                                    (e: any) => {
                                        setData({...data, [item.name]: e.target.value})
                                    })
                        } else if (item.type === 'select') {
                            return new FieldClassSelector(
                                    item.id,
                                    item.name,
                                    item.title,
                                    item.type
                                ).createField(
                                        data[item.name] ?? [],
                                        (e: any) => {
                                            setData({
                                                    ...data,
                                                    [item.name]:Array.from(new Set([
                                                        ...(Array.isArray(data[item.name]) ? data[item.name] : []),
                                                        e.target.value,
                                                    ]))
                                                }
                                        )
                                        },
                                        item.arr
                            
                            )

                        } else if (item.type === 'file') {
                            return new FieldClassFile(item.id, item.name, item.title, item.placeholder, item.type).createField(
                                    data[item.name],
                                    (e: any) => {

                                        const file = e.target.files[0]
                                        if (!file) return

                                        setData({...data, [item.name]: file})
                                    }
                                )
                        } else if (item.type === 'area') {

                        }


                    })
                )

            }

        </Row>



        <Row className='mt-4'>
            <Col>
                <Button text={'Создать'} onClick={() => {}} />
            </Col>

            <Col>
                <Button text={'Очистить'} onClick={() => {}} />
            </Col>
        </Row>
    </Container>
  )
}

export default page
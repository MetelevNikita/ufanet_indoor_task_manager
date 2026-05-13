"use client"

import { FC, useEffect, useState, useContext } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

// contenxt

import { TitleContext, ModalSubmitActive } from '@/app/(main)/layout'

// context


// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import Button from '@/ui/Button/Button'

// Forms

import Input from '@/ui/Input/Input'
import DateInput from '@/ui/Date/Date'
import Select from '@/ui/Select/Select'
import Area from '@/ui/Area/Area'
import File from '@/ui/File/File'
import QrCode from '@/ui/QRcode/QRcode'

// 

import Loading from '../Loading/Loading'

// 

import { currentTypeTask } from '@/helper/typeTask'

// 

import { fileReader } from '@/lib/fileReader'

// modals

import ModalSubmit from '../ModalSubmit/ModalSubmit'

// icons

import { SlCheck } from "react-icons/sl";
import { SlClose } from "react-icons/sl";
import { SlQuestion } from "react-icons/sl";



// 

interface FormProps {
    endpoint: string
}



const Form: FC<FormProps> = ({endpoint}) => {


    const { modal, setModal } = useContext(ModalSubmitActive) as {modal: boolean | null, setModal: (e: any) => any}
    const {title, setTitle} = useContext(TitleContext) as {title: string | null, setTitle: (e: string) => void}


    const router = useRouter()

    // 

    const [dataForm, setDataForm] = useState<any>({})
    const [errorData, setErrorData] = useState<boolean>(false)
    const [qrCodePath, setQrCodePath] = useState<string>('')
    const [resultApi, setResultApi] = useState<{success: boolean, message: string, data: any} | null>(null)
    const [errors, setErrors] = useState<Record<string, boolean>>({})




    // 

    const searchParams = useSearchParams()
    const type = searchParams.get('type')

    if (!type) {
      return
    }


    // validate from

    function validateForm() {
        const nextErrors: Record<string, boolean> = {}

        currentDirectionForm.data.data.forEach((item: any) => {
          const value = dataForm[item.name]?.data

          if (
            value === undefined ||
            value === null ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
          ) {
            nextErrors[item.name] = true
          }
        })

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    // 

    const currentDirectionForm = currentTypeTask(type) 


    useEffect(() => {

      switch (type) {
        case 'uk_text':
            setTitle('Текстовое сообщение')
          return
        case 'uk_qrcode':
            setTitle('Размещение QrCode')
          return
        case 'uk_video':
            setTitle('Видеоролик')
          return
        }
        

    }, [type])


    if (!type) {
      return 'В пути на нет данных'
    }


    function generateFormField (json: any): React.ReactNode {

        return json.data.map((item: any, index: number) => {
            switch (item.type) {
              case 'input':
                return <Col className='mt-1 mb-2' key={index}><Input
                          key={index}
                          title={item.title}
                          value={dataForm[item.name]?.data || ''}
                          placeholder={item.placeholder}
                          onChange={(e: any) => {
                            setDataForm({...dataForm, [item.name]: {fieldName: item.title, data: e.target.value}})
                            setErrors((prev: any) => ({
                            ...errors,
                            [item.name]: false
                          }))
                          }}
                          error={errors[item.name]}
                        /></Col>
              case 'area':
                return <Col className='mt-1 mb-2' key={index}><Area
                          key={index}
                          title={item.title}
                          placeholder={item.placeholder}
                          rows={4}
                          value={dataForm[item.name]?.data || ''}
                          onChange={(e: any) => {
                            setDataForm({...dataForm, [item.name]: {fieldName: item.title, data: e.target.value}})
                            setErrors((prev: any) => ({
                              ...errors,
                              [item.name]: false
                            }))
                          }}
                          error={errors[item.name]}
                          max={200}
                          control={true}                 
                        /></Col>
              case 'select':
                return <Col className='mt-1 mb-2' key={index}><Select
                          key={index}
                          title={item.title}
                          arr={item.arr}
                          value={dataForm[item.name]?.data || []}
                          onChange={(e: any) => {
                            setDataForm({...dataForm, [item.name]: {fieldName: item.title, data: [...(dataForm[item.name]?.data || []), e.target.value]}})
                          }}
                          data={dataForm[item.name]?.data}
                          state={{dataForm, setDataForm}}
                          name={item.name}
                        /></Col>
              case 'date':
                return <Col className='mt-1 mb-2' key={index}><DateInput
                          key={index}
                          title={item.title}
                          value={dataForm[item.name]?.data || ''}
                          placeholder={item.placeholder}
                          onChange={(e: any) => {
                              setDataForm({...dataForm, [item.name]: {fieldName: item.title, data: e.target.value}})
                          }}
                        /></Col>
              case 'file':
                return <Col className='mt-1 mb-2' key={index}><File
                          key={index}
                          title={item.title}
                          name={item.name}
                          placeholder={item.placeholder}
                          value={dataForm[item.name]?.data}
                          onChange={async (e: any) => {


                            const base64File = await fileReader(e.target.files[0])
                            setDataForm({...dataForm, [item.name]: {fieldName: item.title, data: base64File}})
                          }}
                          data={dataForm[item.name]?.data}
                        /></Col>
              case 'qrcode':
                return <Col className='mt-1 mb-2' key={index}><QrCode
                          key={index}
                          title={item.title}
                          value={dataForm[item.name]?.data}
                          placeholder={item.placeholder}
                          onChange={(e: any) => {
                              setDataForm({...dataForm, [item.name]: {fieldName: item.title, data: e.target.value}})
                          }}
                          qrCodeData={{qrCodePath, setQrCodePath}}
                        /></Col>
              default:
                  return []
                          
            }
        })
    }


    // create form


    async function sendTaskYG (body: any) {
      try {


          const response = await fetch('/api/task', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })

          if (!response.ok) {
            throw new Error('Ошибка API сервера')
          }

            const data = await response.json()
            return data
          
        } catch (error) {
          console.error(`Ошибка отправки сообщения в YG ${error}`)
          return `Ошибка отправки сообщения в YG ${error}`
        }
    }

    async function sendTaskTG (body: any) {
      try {


        const response = await fetch('/api/webhook/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })

        if (!response.ok) {
          throw new Error(`Ошибка API TG ${response.status} - ${response.statusText}`)
        }

        const data = response.json()
        return data
        
      } catch (error) {
          console.error(`Ошибка отправки сообщения в TG ${error}`)
          return `Ошибка отправки сообщения в TG ${error}`
        }
    }

    async function createTaskHandler (body: any): Promise<Error | { success: boolean; message: string; data: any } | any> {
      try {

        const typeTask = currentTypeTask(type as string)

        let insertTypeFromBody = {
          typeTask: {fieldName: 'Тип задачи', data: typeTask.label },
          ...body,
        }


        if (type === 'uk_qrcode') {
          insertTypeFromBody = {
            ...dataForm,
            qrcode: {
              fieldName: dataForm.qrcode?.fieldName || 'QrCode',
              data: qrCodePath
            }
          }
        }



        // send to YG

        const result = await sendTaskYG(insertTypeFromBody)
        
        if (!result.success) {
          setModal(false)
          setResultApi(result)
          return
        }

        console.log(result)
        setModal(true)
        setResultApi(result)


      } catch (error: Error | unknown) {

        if (error instanceof Error) {
          console.error(error.message)
          return error.message
        }

        console.error(error)
        return 'error'
      }
    }


    if (!type) {
      return (
        <Loading text='Загрузка'/>
      )
    }



  return (
    <Container>


      {
        (modal !== null) && (
          <Row>

              {
                (resultApi?.success) ? (
                  <ModalSubmit
                    icon={<SlCheck style={{width: '100px', color: "green"}} />}
                    title={'Успешно'}
                    description={resultApi?.message as string ?? ''}
                    onClick={() => {

                      console.log('click')
                      setModal(null)
                      setTitle('Заказ Уфанет')
                      router.push('/')
                      
                    }}
                  />
                ) : (
                <ModalSubmit
                    icon={<SlClose style={{width: '100px', color: "red"}}/>}
                    title={`Ошибка`}
                    description={resultApi?.message as string ?? ''}
                    onClick={() => {
                      setModal(null)
                    }}
                  />)
              }

          </Row>
        )
      }

      <Row className='d-flex flex-column mb-5'>
          {
            generateFormField(currentDirectionForm.data)
          }
      </Row>



      <Row className='mb-5'>
        <Col>
          <Button text={'Создать'} onClick={() => {
            if (!validateForm()) {
              return
            }
            createTaskHandler(dataForm)
          }} />
        </Col>

        <Col>
          <Button text={'Назад'} onClick={() => {
            setTitle('')
            router.push('/')
          }} />
        </Col>
      </Row>
    </Container>
  )
}

export default Form
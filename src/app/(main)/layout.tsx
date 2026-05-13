'use client'

import { FC, useContext, createContext, useState } from 'react'

// components

import TitleElement from '@/ui/TitleElement/TitleElement'
import FAQ from '@/components/FAQ/FAQ'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

// 

import { Container } from 'react-bootstrap'

export const TitleContext = createContext<{title: string | null, setTitle: (e: string) => any} | null>(null)
export const ModalSubmitActive = createContext<{modal: boolean | null, setModal: any } | null>(null)

const Mainlayout = ({ children }: Readonly<{children: React.ReactNode}>) => {

  const [title, setTitle] = useState<string | null>(null)
  const [modal, setModal] = useState<boolean | null>(null)


  return (
    <Container className="min-vh-100 d-flex flex-column">
      <ModalSubmitActive.Provider value={{modal, setModal}}>
        <TitleContext.Provider value={{title, setTitle}}>
          <Header />

            <main className="flex-grow-1 d-flex flex-column justify-content-center">
                <FAQ />
                <TitleElement title={'NAME WEB PAGE'} subtitle={'Сервис для создания заявок на разработку контента для умных экранов вашкего города'} />
                {children}
            </main>

          <Footer />
        </TitleContext.Provider>
      </ModalSubmitActive.Provider>
    </Container>
  )
}

export default Mainlayout
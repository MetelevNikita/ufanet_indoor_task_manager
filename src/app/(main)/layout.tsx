import { FC } from 'react'

// components

import Header from '@/components/Header/Header'

// 

import { Container } from 'react-bootstrap'

const Mainlayout = ({ children }: Readonly<{children: React.ReactNode}>) => {
  return (
    <Container>
        <Header />
        {children}
    </Container>
  )
}

export default Mainlayout
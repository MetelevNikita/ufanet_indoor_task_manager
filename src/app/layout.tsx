import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";

// 

import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./globals.css";


const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
})

const roboto = Roboto({
  subsets: ['cyrillic', 'latin']
})



export const metadata: Metadata = {
  title: "ufanet zakaz",
  description: "Сервис по созданию задач на умные экраны",
  applicationName: 'UZ'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <meta name="apple-mobile-web-app-title" content="UfanetZakaz" />
          <body className={roboto.className}>
            <Container>
                {children}
            </Container>
          </body>
    </html>
  );
}

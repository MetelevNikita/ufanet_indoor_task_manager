'use client'

import { FC } from "react";
import Link from "next/link";
import { motion } from 'motion/react'
import { useRouter } from "next/navigation";

// icon

import { FaTelegramPlane } from "react-icons/fa";

// style

import styles from "./Header.module.css";

//

import { Container, Row, Col } from "react-bootstrap";

// json

import headerMenuJson from "@/json/headerMenu.json" with { type: "json" };

const page: FC = () => {

  const router = useRouter()

  return (
    <Container>
      <Row className={"d-flex justify-content-between align-items-center"} style={{ height: "80px" }}>
        <Col md={6} xs={12}>
          <motion.div
            className={styles.logo_wrapper}
            style={{ transformOrigin: 'bottom right' }}
            whileHover={{scale: 1.1, backgroundColor: '#ff7733'}}
            whileTap={{scale: 1.2}}
            transition={{
                duration: 0.5,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }
                
            }}
            onClick={() => {
              router.push('/')
            }}
          >
              zakaz.ufanet
          </motion.div>
        </Col>

        {/* <Col md={4} xs={12}>
          <div className={styles.menu_container}>
            {headerMenuJson.length > 1 &&
              headerMenuJson.map(
                (item: { id: number; label: string; value: string }, index: number) => {
                  return <motion.div
                              whileHover={{fontWeight: 400, color: '#ff7733'}}
                              whileTap={{scale: 1.05}}
                              key={index}
                              className={styles.menu_item}
                          >
                            {item.label}
                          </motion.div>;
                },
              )}
          </div>
        </Col> */}

        <Col md={4} className="d-flex justify-content-md-end">

            <Link href={'https://t.me/NikitaMetelev'} className={styles.contact_wrapper}>
                  <div className={styles.contact_title}>Что-то не работает? Пишите.</div>
                  <FaTelegramPlane className={styles.contact_icon}/>
            </Link>


        </Col>
      </Row>
    </Container>
  );
};

export default page;

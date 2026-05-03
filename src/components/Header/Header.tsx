import { FC } from "react";

// style

import styles from "./Header.module.css";

//

import { Container, Row, Col } from "react-bootstrap";

// json

import headerMenuJson from "@/json/headerMenu.json" with { type: "json" };

const page = () => {
  return (
    <Container>
      <Row className={"d-flex justify-content-center align-items-center"} style={{ height: "80px" }}>
        <Col md={6}>
          <div className={styles.logo_wrapper}>LOGO ADWORK</div>
        </Col>

        <Col md={4}>
          <div className={styles.menu_container}>
            {headerMenuJson.length > 1 &&
              headerMenuJson.map(
                (item: { id: number; label: string; value: string }, index: number) => {
                  return <div key={index} className={styles.menu_item}>{item.label}</div>;
                },
              )}
          </div>
        </Col>

        <Col md={2} className="d-flex justify-content-end">
          <div className={styles.contact_wrapper}>
            <div className={styles.contact_title}>Что то не работает</div>
            <div className={styles.contact_subtitle}>8-989-951-9063</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default page;

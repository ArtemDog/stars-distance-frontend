import { type FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import { dest_root } from "../target_config";

import "./HomePage.css";

export const HomePage: FC = () => {
  return (
    <div className="homepage-wrapper">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-4 fw-bold mb-3">Stars Distance</h1>
              <p className="lead mb-4 text-secondary">
                Сервис, который поможет вам вычисолить
                расстояние от Земли до звезды в галактике Млечный путь
                по годовому параллаксу звезды из каталога.

              </p>
            </motion.div>
          </Col>

          <Col md={6} className="text-center mt-4 mt-md-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="homepage-image-wrapper"
            >
              <img
                src={`${dest_root}/images/stars_illustration.jpg`}
                alt="Stars illustration"
                className="homepage-image"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

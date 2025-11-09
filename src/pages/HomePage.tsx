import { type FC } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { ROUTES } from "../../Routes";

export const HomePage: FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-4 fw-bold mb-3">Stars Distance</h1>
              <p className="lead mb-4 text-secondary">
                Изучайте расстояния между звёздами и открывайте тайны космоса.  
                Наш проект помогает исследовать Вселенную с точностью
                астрономических наблюдений.
              </p>
              <Link to={ROUTES.STARS}>
                <Button
                  variant="light"
                  size="lg"
                  className="rounded-3 px-4 py-2 fw-semibold"
                >
                  Перейти к звёздам
                </Button>
              </Link>
            </motion.div>
          </Col>

          <Col md={6} className="text-center mt-5 mt-md-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <img
                src="./images/stars_illustration.jpg"
                alt="Stars illustration"
                className="img-fluid"
                style={{
                  maxWidth: "420px",
                  maskImage:
                    "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)",
                  WebkitMaskImage:
                    "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)",
                  transition: "filter 0.3s ease",
                }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

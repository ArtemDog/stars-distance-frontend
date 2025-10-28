import { type FC } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../../Routes";

const Navigation: FC = () => {
  const location = useLocation();

  return (
    <Navbar
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#000", borderBottom: "2px solid #555" }} // серый border
        className="py-3"
        sticky="top"
        >
        <Container>
            {/* Бренд сайта */}
            <Navbar.Brand
            as={Link}
            to={ROUTES.HOME}
            className="fw-bold text-white"
            >
                Stars Distance
            </Navbar.Brand>

            {/* Кнопка для мобилок */}
            <Navbar.Toggle aria-controls="main-navbar-nav" className="border-white" />

            <Navbar.Collapse id="main-navbar-nav">
                <Nav className="ms-auto align-items-lg-center">
                    <Nav.Link
                    as={Link}
                    to={ROUTES.HOME}
                    className={`text-white ${
                        location.pathname === ROUTES.HOME ? "fw-bold" : "fw-normal"
                    }`}
                    >
                    {ROUTE_LABELS.HOME}
                    </Nav.Link>
                    <Nav.Link
                    as={Link}
                    to={ROUTES.STARS}
                    className={`text-white ${
                        location.pathname === ROUTES.STARS ? "fw-bold" : "fw-normal"
                    }`}
                    >
                    {ROUTE_LABELS.STARS}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default Navigation;

import defaultImage from "../assets/default-star-img.png";
import { type FC, useEffect, useState } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { StarCard } from "../components/StarCard";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { getStarsByName, getCartInfo, type Star } from "../modules/starsApi";
import { STARS_MOCK } from "../modules/mock";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { setSearchValue } from "../features/filterSlice";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./CartButton.css";

const StarListPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);

  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [requestID, setRequestID] = useState(-1);

  const navigate = useNavigate();

  const handleSearch = (name: string = searchValue) => {
    setLoading(true);

    getStarsByName(name)
      .then((response) => {
        const data = (response.stars || []).map((star: Star) => ({
          ...star,
          image_url: star.image_url || defaultImage,
        }));
        setStars(data);
      })
      .catch(() => {
        const data = STARS_MOCK.filter((star) =>
          star.name.toLowerCase().startsWith(name.toLowerCase())
        ).map((star) => ({
          ...star,
          image_url: star.image_url || defaultImage,
        }));
        setStars(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleSearch("");

    getCartInfo()
      .then((data) => {
        setCartCount(data.count);
        setRequestID(data.request_id);
      })
      .catch(() => {
        setCartCount(0);
        setRequestID(-1);
      });
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.STARS}/${id}`);
  };

  const handleCartClick = () => {
    if (requestID > 0) {
      navigate(`/request-of-the-distance-to-the-star/${requestID}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
      <Container fluid="lg" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <Row className="align-items-start mb-2" style={{ minHeight: "60px" }}>
          <Col xs={12} md={6} className="d-flex flex-column justify-content-start">
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.STARS }]} />
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-md-end align-items-start mt-3 mt-md-0"
            style={{ gap: "10px" }}
          >
            <InputField
              value={searchValue}
              setValue={(val) => dispatch(setSearchValue(val))}
              loading={loading}
              onSubmit={handleSearch}
              placeholder="Поиск звезды по имени..."
            />

            <button
              onClick={handleCartClick}
              className={`cart-panel ${cartCount > 0 ? "cart-full" : "cart-empty"}`}
            >
              <i className="bi bi-bag" style={{ fontSize: "1.6rem", transform: "translateY(-2px)" }}></i>
              <span className="cart-count">{cartCount}</span>
            </button>
          </Col>
        </Row>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="light" />
          </div>
        )}

        {!loading && (
          !stars.length ? (
            <div className="text-center mt-5">
              <h3>К сожалению, пока ничего не найдено :(</h3>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1.5rem",
                justifyContent: "start",
                margin: 0,
                padding: 0,
              }}
            >
              {stars.map((star) => (
                <div
                  key={star.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCardClick(star.id)}
                >
                  <StarCard
                    id={star.id}
                    name={star.name}
                    spectralClass={star.spectral_class}
                    imageUrl={star.image_url || defaultImage}
                  />
                </div>
              ))}
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default StarListPage;

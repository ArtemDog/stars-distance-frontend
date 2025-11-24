import { type FC, useEffect, useState, useCallback } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { StarCard } from "../components/StarCard";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { getStarsByName, getCartInfo, type Star } from "../modules/starsApi";
import { STARS_MOCK } from "../modules/mock";
import { dest_img } from "../target_config";
import type { RootState, AppDispatch } from "../store/store";
import { setSearchValue } from "../features/filterSlice";
import defaultImage from "../assets/default-star-img.png";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./CartButton.css";
import "./StarListPage.css";

const StarListPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [requestID, setRequestID] = useState(-1);

  /**
   * Fetches stars by name.
   * If the API call fails, it falls back to mock data.
   */
  const handleSearch = useCallback(async (name: string = searchValue) => {
    setLoading(true);
    try {
      const response = await getStarsByName(name);
      const data = (response.stars || []).map((star: Star) => ({
        ...star,
        image_url: star.image_url ? dest_img + star.image_url : defaultImage,
      }));
      setStars(data);
    } catch (error) {
      console.warn("Failed to fetch stars, using mock data", error);
      const data = STARS_MOCK.filter((star) =>
        star.name.toLowerCase().startsWith(name.toLowerCase())
      ).map((star) => ({
        ...star,
        image_url: star.image_url || defaultImage,
      }));
      setStars(data);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  /**
   * Fetches cart info and initial star list.
   */
  useEffect(() => {
    const initData = async () => {
      // Initial search
      handleSearch("");

      // Fetch cart info
      try {
        const data = await getCartInfo();
        setCartCount(data.count);
        setRequestID(data.request_id);
      } catch (error) {
        console.warn("Failed to fetch cart info", error);
        setCartCount(0);
        setRequestID(-1);
      }
    };

    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.STARS}/${id}`);
  };

  const handleCartClick = () => {
    if (requestID > 0) {
      navigate(`/request-of-the-distance-to-the-star/${requestID}`);
    }
  };

  return (
    <div className="star-list-page">
      <Container fluid="lg" className="star-list-container">
        <Row className="align-items-start mb-2 star-list-header">
          <Col xs={12} md={6} className="d-flex flex-column justify-content-start">
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.STARS }]} />
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-md-end align-items-start mt-3 mt-md-0 star-list-search-col"
          >
            <InputField
              value={searchValue}
              setValue={(val) => dispatch(setSearchValue(val))}
              loading={loading}
              onSubmit={() => handleSearch(searchValue)}
              placeholder="Поиск звезды по имени..."
            />

            <button
              onClick={handleCartClick}
              className={`cart-panel ${cartCount > 0 ? "cart-full" : "cart-empty"}`}
              aria-label="Cart"
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
            <div className="star-list-not-found">
              <h3>К сожалению, пока ничего не найдено :(</h3>
            </div>
          ) : (
            <div className="star-grid">
              {stars.map((star) => (
                <div
                  key={star.id}
                  className="star-card-wrapper"
                  onClick={() => handleCardClick(star.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(star.id);
                    }
                  }}
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

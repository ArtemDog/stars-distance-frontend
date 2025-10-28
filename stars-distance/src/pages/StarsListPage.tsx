import { type FC, useState, useEffect } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { StarCard } from "../components/StarCard";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { getStarsByName } from "../modules/starsApi";
import { STARS_MOCK } from "../modules/mock";
import { type Star } from "../modules/starsApi";

const StarListPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  const navigate = useNavigate();

const handleSearch = (name: string = searchValue) => {
  setLoading(true);

  getStarsByName(name)
    .then((response) => {
      setStars(response.stars || []);
      setLoading(false);
    })
    .catch(() => {
      setStars(
        STARS_MOCK.filter((star) =>
          star.name.toLowerCase().startsWith(name.toLowerCase())
        )
      );
      setLoading(false);
    });
};



  useEffect(() => {
    handleSearch("");
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.STARS}/${id}`);
  };

  return (
<div
  style={{
    backgroundColor: "#000",
    minHeight: "100vh",
    color: "#fff",
  }}
>
  <Container fluid="lg" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
    {/* Верхняя панель: хлебные крошки слева, поиск справа */}
    <Row className="align-items-start mb-2" style={{ minHeight: "60px" }}>
      {/* Левая колонка: хлебные крошки прижаты к верхнему краю */}
      <Col
        xs={12}
        md={6}
        className="d-flex flex-column justify-content-start"
      >
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.STARS }]} />
      </Col>

      {/* Правая колонка: поиск */}
      <Col
        xs={12}
        md={6}
        className="d-flex justify-content-md-end align-items-start mt-3 mt-md-0"
      >
        <InputField
          value={searchValue}
          setValue={setSearchValue}
          loading={loading}
          onSubmit={handleSearch}
          placeholder="Поиск звезды по имени..."
        />
      </Col>
    </Row>

    {/* Спиннер */}
    {loading && (
      <div className="text-center my-5">
        <Spinner animation="border" variant="light" />
      </div>
    )}

    {/* Сетка карточек */}
    {!loading &&
      (!stars.length ? (
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
                imageUrl={star.image_url}
              />
            </div>
          ))}
        </div>
      ))}
  </Container>
</div>
  );
};

export default StarListPage;

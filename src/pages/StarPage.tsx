import { type FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Container, Image } from "react-bootstrap";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { getStarById, type Star } from "../modules/starsApi";
import { STARS_MOCK } from "../modules/mock";
import defaultImage from "../assets/default-star-img.png";
import "./StarPage.css";
import { dest_img } from "../target_config";

export const StarPage: FC = () => {
  const { id } = useParams();
  const [starData, setStarData] = useState<Star | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getStarById(Number(id))
      .then((response) => {
        setStarData(response.star || null);
        setLoading(false);
      })
      .catch(() => {
        const star = STARS_MOCK.find((s) => String(s.id) === id) || null;
        setStarData(star);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="star-page">
      <Container fluid="lg" className="star-container">
        {/* Хлебные крошки */}
        <div className="breadcrumbs-wrap">
          <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.STARS, path: ROUTES.STARS },
              { label: starData?.name || "Звезда" },
            ]}
          />
        </div>

        {/* Контейнер с фото и описанием */}
        <div className="star-content">
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : starData ? (
            <>
              {/* Изображение */}
              <Image
                src={dest_img + starData.image_url || defaultImage}
                alt={starData.name}
                className="star-image"
              />

              {/* Описание */}
              <div className="star-details">
                <h1 className="star-title">{starData.name}</h1>

                <div className="star-info">
                  <div className="info-grid">
                    <span>Спектральный класс:</span>
                    <span>{starData.spectral_class}</span>

                    <span>Созвездие:</span>
                    <span>{starData.constellation}</span>

                    <span>Эпоха:</span>
                    <span>{starData.epoch}</span>

                    <span>Прямое восхождение (α):</span>
                    <span>{starData.ra}</span>

                    <span>Склонение (δ):</span>
                    <span>{starData.declension}</span>

                    <span>Видимая звёздная величина (V):</span>
                    <span>{starData.magnitude}</span>

                    {starData.alt_names && (
                      <>
                        <span>Альтернативные обозначения:</span>
                        <span>{starData.alt_names}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h3>Звезда не найдена :(</h3>
          )}
        </div>
      </Container>
    </div>
  );
};

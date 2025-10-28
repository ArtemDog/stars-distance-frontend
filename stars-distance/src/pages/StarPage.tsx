import { type FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Container, Image } from "react-bootstrap";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { getStarById, type Star } from "../modules/starsApi";
import { STARS_MOCK } from "../modules/mock";
import defaultImage from "../assets/default-star-img.png";

export const StarPage: FC = () => {
  const { id } = useParams();
  const [starData, setStarData] = useState<Star | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getStarById(Number(id))
        .then((response) => {
            setStarData(response.star || null); // ✅ берем объект внутри поля star
            setLoading(false);
        })
      .catch(() => {
        const star = STARS_MOCK.find((s) => String(s.id) === id) || null;
        setStarData(star);
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        fluid="lg"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingTop: "2rem",
          paddingBottom: "1rem",
        }}
      >
        {/* Хлебные крошки */}
        <div style={{ flexShrink: 0 }}>
          <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.STARS, path: ROUTES.STARS },
              { label: starData?.name || "Звезда" },
            ]}
          />
        </div>

        {/* Контейнер с фото и описанием */}
        <div
          style={{
            marginTop: "1rem", //  Отступ между хлебными крошками и блоком
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // 🔹 Прижат к верхней части (под крошками)
            gap: "40px",
            flexWrap: "wrap",
            flexGrow: 1,
          }}
        >
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : starData ? (
            <>
              {/* Изображение */}
              <Image
                src={starData.image_url || defaultImage}
                alt={starData.name}
                style={{
                  width: "350px",
                  height: "350px",
                  objectFit: "cover",
                  border: "2px solid rgba(42,42,42,1)",
                  borderRadius: "20px",
                }}
              />

              {/* Описание */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "500px",
                  height: "350px",
                }}
              >
                <h1 style={{ marginTop: 0, flexShrink: 0 }}>
                  {starData.name}
                </h1>

<div
  style={{
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    backgroundColor: "rgba(15, 15, 15, 0.4)",
    border: "2px solid rgba(40, 40, 40, 0.5)",
    borderRadius: "20px",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
    backdropFilter: "blur(12px) saturate(140%)",
    WebkitBackdropFilter: "blur(12px) saturate(140%)",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      rowGap: "18px",
      columnGap: "10px",
      fontSize: "0.95rem",
      lineHeight: "1.3",
    }}
  >
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

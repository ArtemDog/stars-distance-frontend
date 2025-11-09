import { type FC } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface StarCardProps {
  id: string | number;
  name: string;
  spectralClass: string;
  imageUrl?: string;
}

export const StarCard: FC<StarCardProps> = ({ id, name, spectralClass, imageUrl }) => {
  return (
    <Card
      className="star-card bg-transparent text-white"
      style={{
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        backgroundColor: "rgba(15, 15, 15, 0.4)",
        borderRadius: "12px",
        border: "2px solid rgba(40, 40, 40, 0.5)",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
        padding: "10px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={name}
        style={{
          borderRadius: "8px",
          aspectRatio: "1 / 1",
          objectFit: "cover",
        }}
      />
      <Card.Body className="d-flex flex-column align-items-start mt-3 p-2">
        <Card.Title className="mb-1" style={{ fontSize: "18px", color: "#fff" }}>
          {name}
        </Card.Title>
        <Card.Text className="mb-2" style={{ fontSize: "14px", color: "#aaa" }}>
          Спектральный класс: {spectralClass}
        </Card.Text>
        <div className="d-flex w-100 mt-2">
        <Link to={`/stars/${id}`} className="flex-grow-1 text-decoration-none">
            <Button
            variant="dark"
            className="w-100 text-white fw-semibold"
            style={{
                backgroundColor: "rgba(15, 15, 15, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "5px",
                fontSize: "14px",
                transition: "all 0.25s ease",
                backdropFilter: "blur(8px) saturate(130%)",
                WebkitBackdropFilter: "blur(8px) saturate(130%)",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(25, 25, 25, 0.8)";
                (e.currentTarget as HTMLButtonElement).style.border = "2px solid rgba(80, 80, 80, 0.6)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(15, 15, 15, 0.6)";
                (e.currentTarget as HTMLButtonElement).style.border = "2px solid rgba(40, 40, 40, 0.5)";
            }}
            >
            Подробнее
            </Button>
        </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

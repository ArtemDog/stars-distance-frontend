import { type Star } from "./starsApi";
import starIllustration from "../../images/stars_illustration.jpg";

export const STARS_MOCK: Star[] = [
  {
    id: 1,
    name: "Сириус",
    spectral_class: "A1V",
    constellation: "Большой Пёс",
    epoch: "J2000",
    ra: "06h 45m 08.9s",
    declension: "-16° 42′ 58″",
    magnitude: "-1.46",
    alt_names: "α CMa, Dog Star",
    image_url: starIllustration,
  },
  {
    id: 2,
    name: "Бетельгейзе",
    spectral_class: "A1V",
    constellation: "Орион",
    epoch: "J2000",
    ra: "05h 55m 10.3s",
    declension: "+07° 24′ 25″",
    magnitude: "0.42",
    alt_names: "α Ori",
    image_url: "",
  },
];

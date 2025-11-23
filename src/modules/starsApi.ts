import { dest_api } from "../target_config"

export interface Star {
  id: number;
  name: string;
  spectral_class: string;
  constellation: string;
  epoch: string;
  ra: string;
  declension: string;
  magnitude: string;
  alt_names: string;
  image_url?: string;
}

export interface StarsResponse {
  resultCount: number;
  stars: Star[];
}

export interface StarResponse {
  star: Star;
}

export interface CartResponse {
  request_id: number;
  count: number;
}

// Получение всех звезд или по имени
export const getStarsByName = async (name = ""): Promise<StarsResponse> => {
  return fetch(dest_api + `/stars?star-by-name=${name}`)
    .then((response) => response.json());
};

// Почение конкретной звезды по ID
export const getStarById = async (id: number): Promise<StarResponse> => {
  return fetch(dest_api + `/stars/${id}`)
    .then((response) => response.json());
};

// Получение информации о корзине
export const getCartInfo = async (): Promise<CartResponse> => {
  const response = await fetch(dest_api + `/request-star-distance/cart`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart info");
  }
  return response.json();
};
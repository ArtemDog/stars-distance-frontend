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
// Получение всех звезд или по имени
export const getStarsByName = async (name = ""): Promise<StarsResponse> => {
  return fetch(`/api/stars?star-by-name=${name}`)
    .then((response) => response.json());
};

// Почение конкретной звезды по ID
export const getStarById = async (id: number): Promise<StarResponse> => {
  return fetch(`/api/stars/${id}`)
    .then((response) => response.json());
};
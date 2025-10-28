export const ROUTES = {
  HOME: "/",
  STARS: "/stars",
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Главная",
  STARS: "Звёзды",
};
import { type FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../Routes"
import Navigation from "./components/Navigation"
import { HomePage } from "./pages/HomePage"
import StarListPage from "./pages/StarsListPage"
import { StarPage } from "./pages/StarPage";

const App: FC = () => {
    return (
      <BrowserRouter basename="/stars-distance-frontend">
        <Navigation />
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.STARS} element={<StarListPage />} />
          <Route path={`${ROUTES.STARS}/:id`} element={<StarPage />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;

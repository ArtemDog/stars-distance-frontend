import { type FC, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../Routes"
import Navigation from "./components/Navigation"
import { HomePage } from "./pages/HomePage"
import StarListPage from "./pages/StarsListPage"
import { StarPage } from "./pages/StarPage";
import { invoke } from "@tauri-apps/api/core";
import { dest_root } from './target_config'

const App: FC = () => {
  useEffect(() => {
    invoke("tauri", { cmd: "create" })
      .then(() => console.log("Tauri launched"))
      .catch(() => console.log("Tauri not launched"));

    return () => {
      invoke("tauri", { cmd: "close" })
        .then(() => console.log("Tauri closed"))
        .catch(() => console.log("Tauri close error"));
    };
  }, []);
  return (
    <BrowserRouter basename={dest_root}>
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

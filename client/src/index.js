import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Discover from "./components/LandingPage/Discover";
import Join from "./components/LandingPage/Join";
import SignIn from "./components/LandingPage/SignIn";
import LandingMain from "./components/LandingPage/LandingMain";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<LandingMain />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="join" element={<Join />} />
          <Route path="signIn" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

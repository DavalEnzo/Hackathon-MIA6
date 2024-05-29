import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Data from "./pages/Data";
import AboutPage from "./pages/AboutPage";
import PositionTorch from "./pages/PositionTorch";
import PredictionPage from "./pages/PredictionPage";
import FaqPage from "./pages/FaqPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/olympic-results" element={<Data />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/position-flamme" element={<PositionTorch />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
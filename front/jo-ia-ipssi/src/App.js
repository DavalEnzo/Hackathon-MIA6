import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Standings from "./pages/Standings";
import Data from "./pages/Data";
import AboutPage from "./pages/AboutPage";
import PositionTorch from "./pages/PositionTorch";
import FaqPage from "./pages/FaqPage";
import PredictionPage from "./pages/PredictionPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/classements" element={<Standings />} />
        <Route path="/olympic-results" element={<Data />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/position-flamme" element={<PositionTorch />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Standings from "./pages/Standings";
import Data from "./pages/Data";
import AboutPage from "./pages/AboutPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/classements" element={<Standings />} />
        <Route path="/olympic-results" element={<Data />} />
        <Route path="/a-propos" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
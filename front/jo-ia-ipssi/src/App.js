import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Standings from "./pages/Standings";
import Data from "./pages/Data";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/classements" element={<Standings />} />
        <Route path="/olympic-results" element={<Data />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
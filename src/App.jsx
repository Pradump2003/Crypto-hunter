import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import CoinConverter from "./pages/CoinConverter";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#14161a] text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/coin-converter" element={<CoinConverter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

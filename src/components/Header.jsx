import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <div className="w-full bg-transparent border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1
          onClick={() => navigate("/")}
          className="text-gold text-xl font-bold cursor-pointer"
        >
          Crypto Hunter
        </h1>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-[#14161a] border border-gray-500 px-3 py-2 rounded"
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>
    </div>
  );
};

export default Header;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { CryptoState } from "../context/CryptoContext";

export default function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoin();
  }, [id]);

  if (!coin)
    return <div className="text-center text-yellow-400">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row text-white">
      
      {/* ✅ LEFT SIDEBAR */}
      <div className="md:w-1/3 flex flex-col items-center p-6 border-r border-gray-700">
        <img
          src={coin.image.large}
          alt={coin.name}
          className="h-40 mb-6"
        />

        <h1 className="text-4xl font-bold mb-4">{coin.name}</h1>

        <p className="text-gray-300 text-sm mb-6 text-center">
          {coin.description.en.split(". ")[0]}.
        </p>

        {/* ✅ COIN DATA */}
        <div className="w-full space-y-4 text-lg">
          <p>
            <span className="font-bold">Rank:</span>{" "}
            {coin.market_cap_rank}
          </p>

          <p>
            <span className="font-bold">Current Price:</span>{" "}
            {symbol}{" "}
            {coin.market_data.current_price[currency.toLowerCase()].toLocaleString()}
          </p>

          <p>
            <span className="font-bold">Market Cap:</span>{" "}
            {symbol}{" "}
            {coin.market_data.market_cap[currency.toLowerCase()]
              .toString()
              .slice(0, -6)}
            M
          </p>
        </div>
      </div>

      {/* ✅ RIGHT SIDE → GRAPH */}
      <CoinInfo coin={coin} />
    </div>
  );
}

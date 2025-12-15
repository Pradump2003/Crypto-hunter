import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../context/CryptoContext";
import { numberWithCommas } from "../CoinsTable";

import "react-alice-carousel/lib/alice-carousel.css"; // ✅ IMPORTANT

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  // ✅ RESPONSIVE OBJECT (YOU ASKED WHERE TO WRITE THIS)
  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        key={coin.id}
        to={`/coins/${coin.id}`}
        className="flex flex-col items-center text-white uppercase cursor-pointer"
      >
        <img
          src={coin.image}
          alt={coin.name}
          className="h-20 mb-2"
        />

        <span className="text-sm">
          {coin.symbol}
          <span
            className={`ml-2 font-medium ${
              profit ? "text-green-400" : "text-red-500"
            }`}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>

        <span className="text-lg font-semibold">
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className="flex items-center h-1/2">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../context/CryptoContext";

export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const coinsPerPage = 10;

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const visibleCoins = filteredCoins.slice(
    (page - 1) * coinsPerPage,
    page * coinsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Cryptocurrency Prices by Market Cap
      </h2>

      {/* Search */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Search cryptocurrency..."
          className="
      w-full px-4 py-3 pl-11
      rounded-lg
      bg-[#16171a] text-white
      placeholder-gray-400
      border border-gray-700
      focus:outline-none
      focus:border-yellow-400
      focus:ring-1 focus:ring-yellow-400
      transition
    "
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Head → Hidden on mobile */}
          <thead className="bg-yellow-400 text-black hidden sm:table-header-group">
            <tr>
              <th className="text-left p-4 rounded-tl-lg">Coin</th>
              <th className="text-right p-4">Price</th>
              <th className="text-right p-4">24h Change</th>
              <th className="text-right p-4 rounded-tr-lg">Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {visibleCoins.map((coin) => {
              const profit = coin.price_change_percentage_24h > 0;

              return (
                <tr
                  key={coin.id}
                  onClick={() => navigate(`/coins/${coin.id}`)}
                  className="
              block sm:table-row
              bg-[#16171a] hover:bg-[#131111]
              cursor-pointer border-b border-gray-700
              rounded-lg sm:rounded-none
              mb-4 sm:mb-0
            "
                >
                  {/* Coin */}
                  <td className="p-4 flex items-center gap-4 sm:flex sm:items-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-12 sm:h-16"
                    />
                    <div>
                      <div className="uppercase font-semibold">
                        {coin.symbol}
                      </div>
                      <div className="text-gray-400 text-sm">{coin.name}</div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4 sm:text-right flex justify-between sm:table-cell">
                    <span className="sm:hidden text-gray-400">Price</span>
                    <span>
                      {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                    </span>
                  </td>

                  {/* 24h Change */}
                  <td
                    className={`p-4 sm:text-right font-medium flex justify-between sm:table-cell ${
                      profit ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    <span className="sm:hidden text-gray-400">24h Change</span>
                    <span>
                      {profit && "+"}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </td>

                  {/* Market Cap */}
                  <td className="p-4 sm:text-right flex justify-between sm:table-cell">
                    <span className="sm:hidden text-gray-400">Market Cap</span>
                    <span>
                      {symbol}{" "}
                      {numberWithCommas(
                        coin.market_cap.toString().slice(0, -6)
                      )}
                      M
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 sm:gap-3 mt-6 sm:mt-8 text-yellow-400 text-xs sm:text-base">
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-2 py-1 sm:px-3 sm:py-1 rounded
               hover:bg-yellow-400 hover:text-black
               disabled:opacity-40"
        >
          ‹
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;

          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= page - 1 && pageNum <= page + 1) || // tighter range on mobile
            (pageNum >= page - 2 &&
              pageNum <= page + 2 &&
              window.innerWidth >= 640)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-2 py-1 sm:px-3 sm:py-1 rounded ${
                  page === pageNum
                    ? "bg-yellow-400 text-black"
                    : "hover:bg-yellow-400 hover:text-black"
                }`}
              >
                {pageNum}
              </button>
            );
          }

          if (pageNum === page - 2 || pageNum === page + 2) {
            return (
              <span key={pageNum} className="px-1 sm:px-2">
                ...
              </span>
            );
          }

          return null;
        })}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-2 py-1 sm:px-3 sm:py-1 rounded
               hover:bg-yellow-400 hover:text-black
               disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CoinsTable;

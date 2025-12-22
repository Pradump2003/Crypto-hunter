import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "../config/api.js";
import { CryptoState } from "../context/CryptoContext";

const CoinConverter = () => {
  const [coins, setCoins] = useState([]);
  const [fromCoin, setFromCoin] = useState("bitcoin");
  const [toCoin, setToCoin] = useState("ethereum");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  // mobile modal states
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const { currency } = CryptoState();

  // fetch coins
  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
  };

  // convert coin → coin
  const convertCoin = async () => {
    if (!fromCoin || !toCoin || !amount) return;

    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: `${fromCoin},${toCoin}`,
          vs_currencies: "usd",
        },
      }
    );

    const fromPrice = data[fromCoin]?.usd;
    const toPrice = data[toCoin]?.usd;
    if (!fromPrice || !toPrice) return;

    setResult((fromPrice / toPrice) * amount);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    convertCoin();
  }, [fromCoin, toCoin, amount]);

  const getCoinName = (id) =>
    coins.find((c) => c.id === id)?.name || "Select coin";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 pt-24
             bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('banner2.jpg')",
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-3xl bg-white/10 backdrop-blur-sm
                      border border-white/10 rounded-2xl
                      shadow-2xl p-4 sm:p-8"
      >
        <h2 className="text-xl sm:text-3xl font-semibold text-center text-white mb-6">
          Crypto Converter
        </h2>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Amount */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Amount</label>
            <input
              type="number"
              min="0.0000001"
              step="any"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || Number(val) <= 0) return;
                setAmount(val);
              }}
              className="w-full px-3 py-2.5 rounded-lg bg-white text-black"
            />
          </div>

          {/* From */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">From</label>

            {/* Desktop */}
            <select
              value={fromCoin}
              onChange={(e) => setFromCoin(e.target.value)}
              className="hidden md:block w-full px-3 py-2.5 rounded-lg bg-white text-black"
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>

            {/* Mobile */}
            <button
              onClick={() => setOpenFrom(true)}
              className="md:hidden w-full px-3 py-2.5 rounded-lg bg-white text-black text-left"
            >
              {getCoinName(fromCoin)}
            </button>
          </div>

          {/* To */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">To</label>

            {/* Desktop */}
            <select
              value={toCoin}
              onChange={(e) => setToCoin(e.target.value)}
              className="hidden md:block w-full px-3 py-2.5 rounded-lg bg-white text-black"
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>

            {/* Mobile */}
            <button
              onClick={() => setOpenTo(true)}
              className="md:hidden w-full px-3 py-2.5 rounded-lg bg-white text-black text-left"
            >
              {getCoinName(toCoin)}
            </button>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={convertCoin}
          className="w-full py-2.5 rounded-lg
                     bg-blue-600 hover:bg-blue-700
                     text-white font-medium"
        >
          Convert
        </button>

        {/* Result */}
        {result && (
          <div className="text-center text-base sm:text-xl font-medium mt-5 text-white">
            {amount} {fromCoin.toUpperCase()} =
            <span className="text-yellow-400 ml-2">
              {result.toFixed(6)} {toCoin.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* FROM COIN MODAL */}
      {openFrom && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
          <div
            className="w-full max-h-[70vh] bg-[#14161a]
                          rounded-t-2xl p-4 overflow-y-auto"
          >
            <h3 className="text-white mb-3">Select Coin</h3>

            {coins.slice(0, 100).map((coin) => (
              <div
                key={coin.id}
                onClick={() => {
                  setFromCoin(coin.id);
                  setOpenFrom(false);
                }}
                className="py-3 text-white border-b border-gray-700 cursor-pointer"
              >
                {coin.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TO COIN MODAL */}
      {openTo && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
          <div
            className="w-full max-h-[70vh] bg-[#14161a]
                          rounded-t-2xl p-4 overflow-y-auto"
          >
            <h3 className="text-white mb-3">Select Coin</h3>

            {coins.slice(0, 100).map((coin) => (
              <div
                key={coin.id}
                onClick={() => {
                  setToCoin(coin.id);
                  setOpenTo(false);
                }}
                className="py-3 text-white border-b border-gray-700 cursor-pointer"
              >
                {coin.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinConverter;

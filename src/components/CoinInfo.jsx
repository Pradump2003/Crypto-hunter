import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import { CryptoState } from "../context/CryptoContext";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(365);
  const { currency } = CryptoState();

  useEffect(() => {
    const fetchHistoricData = async () => {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
    };

    fetchHistoricData();
  }, [days, currency, coin.id]);

  if (!historicData.length) {
    return (
      <div className="flex justify-center items-center w-full py-20">
        <span className="text-yellow-400 text-lg">Loading chart...</span>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/3 px-4 md:px-8 py-6">
      {/* 📊 Chart Container */}
      <div className="bg-[#111827] rounded-xl p-4 md:p-6 shadow-lg">
        <Line
          data={{
            labels: historicData.map((price) => {
              const date = new Date(price[0]);
              return days === 1
                ? `${date.getHours()}:${String(
                    date.getMinutes()
                  ).padStart(2, "0")}`
                : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData.map((price) => price[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#FACC15",
                backgroundColor: "rgba(250,204,21,0.15)",
                tension: 0.4,
                pointRadius: 0, // ❌ remove graph circles
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: "#e5e7eb" },
              },
            },
            scales: {
              x: {
                ticks: { color: "#9ca3af", maxTicksLimit: 8 },
                grid: { display: false },
              },
              y: {
                ticks: { color: "#9ca3af" },
                grid: { color: "#1f2937" },
              },
            },
          }}
          height={350}
        />
      </div>

      {/* ⏱ Time Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {chartDays.map((day) => (
          <button
            key={day.value}
            onClick={() => setDays(day.value)}
            className={`px-5 py-2 rounded-lg border border-yellow-400 text-sm md:text-base transition
              ${
                days === day.value
                  ? "bg-yellow-400 text-black font-bold"
                  : "text-yellow-400 hover:bg-yellow-400 hover:text-black"
              }`}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinInfo;

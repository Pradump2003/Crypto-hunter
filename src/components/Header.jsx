import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CryptoState } from "../context/CryptoContext";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-medium"
      : "text-white hover:text-yellow-400";

  return (
    <header
      className="fixed top-0 w-full z-50
                       bg-[#14161a]/80 backdrop-blur-md
                       border-b border-gray-700"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-yellow-400 text-base sm:text-xl font-bold cursor-pointer"
        >
          Crypto Hunter
        </h1>

        {/* Desktop Menu */}
        <div className="flex gap-5">
          <div className="hidden md:flex gap-5 items-center">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/coin-converter" className={navClass}>
              Converter
            </NavLink>
          </div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-[#14161a] border border-gray-600
                       px-3 py-2 rounded text-white
                       focus:outline-none focus:border-yellow-400 text-sm sm:text-base"
          >
            <option value="USD" className="text-sm sm:text-base">
              USD
            </option>
            <option value="INR" className="text-sm sm:text-base">
              INR
            </option>
          </select>
        </div>

        {/* Mobile Hamburger */}

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-[#14161a]/95 backdrop-blur-md border-t border-gray-700">
          <div className="flex flex-col px-6 py-4 gap-4">
            <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <NavLink
              to="/coin-converter"
              className={navClass}
              onClick={() => setOpen(false)}
            >
              Converter
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

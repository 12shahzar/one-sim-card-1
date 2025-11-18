import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.svg";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const desktopMenuRef = useRef(null);

  const isActive = (path) =>
    location.pathname === path ? "text-[#455E86] font-semibold" : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target)
      ) {
        setDesktopMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white font-sora">
      <nav className="px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="h-14 md:h-12 lg:h-16 mr-2 transition-all duration-300"
              alt="OneSimCard Logo"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6 text-[#08080C] font-regular">
              <li>
                <Link
                  to="/"
                  className={`hover:text-[#455E86] transition ${isActive("/")}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/IoTSolutions"
                  className={`hover:text-[#455E86] transition ${isActive(
                    "/IoTSolutions"
                  )}`}
                >
                  IoT Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/ConsumerIOT"
                  className={`hover:text-[#455E86] transition ${isActive(
                    "/ConsumerIOT"
                  )}`}
                >
                  Consumer IoT
                </Link>
              </li>
              <li>
                <Link
                  to="/Technology"
                  className={`hover:text-[#455E86] transition ${isActive(
                    "/Technology"
                  )}`}
                >
                  Technology
                </Link>
              </li>

              {/* MENU ICON AFTER TECHNOLOGY */}
              <li className="relative">
                <button
                  onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                  className="p-2 border-2 border-[#455E86] rounded-full hover:bg-[#455E86] hover:text-white transition cursor-pointer"
                >
                  {desktopMenuOpen ? (
                    <X size={26} color="#F4C600" />
                  ) : (
                    <Menu size={26} color="#F4C600" />
                  )}
                </button>

                {desktopMenuOpen && (
                  <div
                    ref={desktopMenuRef}
                    className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  >
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to="/WhyOneSimCard"
                          onClick={() => setDesktopMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Why OneSimCard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/starterkit"
                          onClick={() => setDesktopMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Starter Kit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/customquote"
                          onClick={() => setDesktopMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Custom Quote
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/rates"
                          onClick={() => setDesktopMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Rates{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="https://www.onesimcard.com/corporate/"
              className="text-black text-sm px-4 border-r-2 border-[#A8ADB4] font-medium"
            >
              Login
            </Link>
            <Link
              to="/CustomQuote"
              className="text-black bg-[#F4C600] rounded-full text-sm px-8 py-3 font-medium hover:bg-[#e2b900] transition"
            >
              Contact Us
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-white border-t border-gray-200 shadow-lg rounded-lg">
            <ul className="flex flex-col space-y-3 px-4 py-3 text-[#08080C]">
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 hover:text-[#455E86] ${isActive("/")}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/IoTSolutions"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 hover:text-[#455E86] ${isActive(
                    "/GlobalCoverage"
                  )}`}
                >
                  IoT Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/ConsumerIOT"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 hover:text-[#455E86] ${isActive(
                    "/EasySIMManagement"
                  )}`}
                >
                  Consumer IoT
                </Link>
              </li>
              <li>
                <Link
                  to="/Technology"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 hover:text-[#455E86] ${isActive(
                    "/Technology"
                  )}`}
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/WhyOneSimCard"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 hover:text-[#455E86] ${isActive(
                    "/WhyOneSimCard"
                  )}`}
                >
                  Why OneSimCard
                </Link>
              </li>
              <li>
                <Link
                  to="/StarterKit"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 hover:text-[#455E86] ${isActive(
                    "/StarterKit"
                  )}`}
                >
                  Starter Kit
                </Link>
              </li>
              <li>
                <Link
                  to="/customquote"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 hover:text-[#455E86] ${isActive(
                    "/customquote"
                  )}`}
                >
                  Custom Quote
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.onesimcard.com/corporate/"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 border-t border-gray-100"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/CustomQuote"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-[#F4C600] rounded-full py-3 font-medium hover:bg-[#e2b900] transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

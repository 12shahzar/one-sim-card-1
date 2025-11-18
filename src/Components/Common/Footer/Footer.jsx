import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/logo.svg";
import location from "../../../assets/images/location.svg";
import cell from "../../../assets/images/cell.svg";

import CustomButton from "../../CustomButton/CustomButton";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-[#6B7280] w-full">
      {/* === Top Section === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* === Logo + Buttons === */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2 mb-6">
            <img
              src={logo}
              className="h-14  md:h-12 lg:h-16 "
              alt="One-Sim-Card Logo"
            />
          </div>
          <div className="flex flex-col space-y-3 w-full sm:w-auto">
            <CustomButton text="IoT Starter Kit" to="/StarterKit" />
            <CustomButton text="Custom IoT Quote" to="/CustomQuote" />
          </div>
        </div>

        {/* === Contact === */}
        <div>
          <h3 className="text-[#455E86] font-semibold mb-3 text-lg">Contact</h3>
          <p className="text-sm mb-2">Contact Customer Support</p>
          <div className="flex items-start mb-2 gap-2">
            <img src={location} />
            <p className="text-sm mb-2 leading-relaxed">
              PO Box 4901, Belmont, MA
              <br />
              02478-0004, USA
            </p>
          </div>

          <div className="flex items-start mb-2 gap-2">
            <img src={cell} />
            <div>
              <p className="text-sm mb-1"> 1-617-313-8888</p>
              <p className="text-sm">1-800-640-2113</p>
            </div>
          </div>
        </div>

        {/* === Company === */}
        <div>
          <h3 className="text-[#455E86] font-semibold mb-3 text-lg">Company</h3>
          <ul className="text-sm space-y-1.5 font-regular">
            <li>
              <Link
                to="https://www.onesimcard.com/about-us/?_gl=1*1pg4f8r*_gcl_au*MTUzNzk1NTEwMy4xNzU3MDMyNzgw"
                className="hover:text-[#F4C600]"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link to="/businessOppotunities" className="hover:text-[#F4C600]">
                Business Opportunities
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#F4C600]">
                IoT Blog
              </Link>
            </li>
            <li>
              <Link to="/pressReleases" className="hover:text-[#F4C600]">
                Press Releases
              </Link>
            </li>
            <li>
              <Link
                to="https://www.onesimcard.com/M2M-account-terms-of-use/"
                className="hover:text-[#F4C600]"
              >
                Terms of Use for M2M
              </Link>
            </li>
            <li>
              <Link
                to="https://www.onesimcard.com/privacy-policy"
                className="hover:text-[#F4C600]"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#F4C600]">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        {/* === Support === */}
        <div>
          <h3 className="text-[#455E86] font-semibold mb-3 text-lg">Support</h3>
          <ul className="text-sm space-y-1.5 font-regular">
            {/* <li>
              <Link to="#" className="hover:text-[#F4C600]">
                FAQs
              </Link>
            </li> */}
            <li>
              <Link
                to="https://www.onesimcard.com/?user"
                className="hover:text-[#F4C600]"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                to="/Technology?section=Technology&item=UnderstandingM2MSIMCards"
                className="hover:text-[#F4C600]"
              >
                Understanding M2M SIM Cards
              </Link>
            </li>
            <li>
              <Link to="/Technology" className="hover:text-[#F4C600]">
                IoT SIM Compatibility
              </Link>
            </li>
            <li>
              <Link to="/GlobalCoverage" className="hover:text-[#F4C600]">
                IoT SIM Card Coverage
              </Link>
            </li>
            <li>
              <Link
                to="/Technology?section=Technology&item=1SIMIoTApp"
                className="hover:text-[#F4C600]"
              >
                1SIM IoT App
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* === Social Media Icons === */}
      <div className="max-w-7xl mx-auto flex justify-center sm:justify-end px-4 sm:px-6 md:px-8">
        <div className="flex text-white text-lg bg-[#6B7280] px-6 py-3 rounded-t-full divide-x divide-white/40">
          {[
            { Icon: FaFacebookF },
            { Icon: FaTwitter },
            { Icon: FaGooglePlusG },
            { Icon: FaInstagram },
            { Icon: FaLinkedinIn },
          ].map(({ Icon }, idx) => (
            <Link
              key={idx}
              to="#"
              className="hover:text-[#F4C600] px-4 first:pl-0 last:pr-0 flex items-center justify-center"
            >
              <Icon />
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 "></div>

      {/* === Bottom Section === */}
      <div className="bg-white py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
          <p className="text-center text-xs text-gray-500">
            © 2006–2025 Belmont Telecom Inc., DBA OneSimCard.com. All rights
            reserved.
          </p>
          <CustomButton
            text="Live Chat"
            bgColor="#455E86"
            hoverColor="#3b5072"
            textColor="white"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

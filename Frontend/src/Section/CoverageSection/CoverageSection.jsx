import React, { useState, useEffect } from "react";
import mapData from "../../data/mapData.json";
import { getCountries, getOperatorsAndPlans } from "../../api/apiService";

const CoverageSection = () => {
  const [selectedCountry, setSelectedCountry] = useState("Canada");
  const [countries, setCountries] = useState([]);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCountryClick = (country) => {
    console.log(country);
    setSelectedCountry(country.name || country.id);
  };

  // 🔥 Fetch countries from API
  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data || []);

        console.log("Fetched countries:", data);

        // Default selected
        if (data?.length > 0) {
          setSelectedCountry(data[0]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchOperators = async () => {
      try {
        const data = await getOperatorsAndPlans(selectedCountry);
        setOperators(data?.operators || []);
        console.log("Operators:", data?.operators);
      } catch (error) {
        console.error("Error fetching operators:", error);
      }
    };

    fetchOperators();
  }, [selectedCountry]);

  return (
    <section
      className="
    w-[calc(100vw-1rem)]
    md:w-[calc(100vw-4rem)]
    sm:w-[calc(100vw-4rem)]
    min-h-[calc(100vh-3rem)]
    flex flex-col items-center justify-center
    overflow-hidden rounded-4xl
  "
      style={{
        background: "linear-gradient(to bottom, #FFFFFF 70%, #455E86 30%)",
      }}
    >
      {/* World Map */}
      <div className="w-full max-w-7xl mb-6 sm:mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2000 1000"
          className="w-full h-auto object-contain"
        >
          <style>
            {`
              .country {
                fill: #455E86;
                stroke: #FFFFFF;
                stroke-width: 0.5;
                cursor: pointer;
                transition: fill 0.2s ease;
              }
              .country:hover { fill: #2a3b57; }
              .red { fill: #dddd; }
              .red:hover { fill: #adb5bd; }
            `}
          </style>
          {mapData?.map((country, index) => (
            <path
              key={index}
              d={country?.["d"]}
              className={`country ${country?.isRed ? "red" : ""}`}
              onClick={() => handleCountryClick(country)}
            >
              <title>{country?.["name"] || country?.["id"]}</title>
            </path>
          ))}
        </svg>
      </div>

      {/* Coverage Info */}
      <section className="w-full max-w-7xl bg-white rounded-3xl sm:rounded-4xl p-4 sm:p-8 md:p-10 font-sora border border-[#D2D2D2] mb-4 md:mb-20">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#08080C] text-sm sm:text-base md:text-xl leading-relaxed">
            Use the tool below to discover the countries and networks
            <br className="hidden sm:block" /> on which we operate.
          </p>
          <div className="relative">
            {" "}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="appearance-none border border-[#D2D2D2] rounded-full min-w-3xs px-4 py-2 text-[#455E86] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#F4C600] cursor-pointer"
            >
              {" "}
              {/* Dynamically merge countries + selected one if missing */}{" "}
              {[...new Set([...countries, selectedCountry])]?.map((country) => (
                <option key={country} value={country}>
                  {" "}
                  {country}{" "}
                </option>
              ))}{" "}
            </select>{" "}
            <span className="absolute right-4 top-2.5 text-[#455E86] pointer-events-none">
              {" "}
              ▼{" "}
            </span>{" "}
          </div>{" "}
        </div>

        {/* Responsive Table */}
        <div className="mt-6 sm:mt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#08080C] font-bold">
                <th className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4 rounded-l-2xl">
                  Mobile Carrier
                </th>
                <th className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
                  Code
                </th>
                <th className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4 rounded-r-2xl">
                  Speed
                </th>
              </tr>
            </thead>
            <tbody>
              {operators?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#D2D2D2] text-[#6B7280]"
                >
                  <td className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
                    {item?.operatorName}
                  </td>
                  <td className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
                    {item?.mccMnc}
                  </td>
                  <td className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
                    {item?.supportedNetworkTypes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default CoverageSection;

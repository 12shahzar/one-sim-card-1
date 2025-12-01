import React, { useState } from "react";
import mapData from "../../data/mapData.json";

const CoverageSection = () => {
  const [selectedCountry, setSelectedCountry] = useState("Canada");

  const handleCountryClick = (country) => {
    console.log(country);
    setSelectedCountry(country.name || country.id);
  };

  const countries = ["Canada", "USA", "UK"];

  const generalCoverageData = [
    { carrier: "Generic Carrier 1", code: "000000", speed: "4G/5G" },
    { carrier: "Generic Carrier 2", code: "111111", speed: "4G/5G" },
    { carrier: "Generic Carrier 3", code: "222222", speed: "4G/5G" },
  ];

  const coverageData = {
    Canada: [
      { carrier: "Bell Mobility Canada", code: "302610", speed: "5G" },
      {
        carrier: "Rogers Communications Canada Inc",
        code: "302720, 302370",
        speed: "5G",
      },
      { carrier: "Telus Communication Inc.", code: "302220", speed: "5G" },
    ],
    USA: [
      { carrier: "AT&T", code: "310410", speed: "5G" },
      { carrier: "T-Mobile", code: "310260", speed: "5G" },
      { carrier: "Verizon", code: "311480", speed: "5G" },
    ],
    UK: [
      { carrier: "Vodafone UK", code: "23415", speed: "5G" },
      { carrier: "O2 UK", code: "23410", speed: "5G" },
      { carrier: "EE", code: "23430", speed: "5G" },
    ],
  };

  return (
    <section
       className="
    w-[calc(100vw-4rem)]  /* 3rem = m-6 * 2 (left + right) */
    min-h-[calc(80vh-3rem)] /* same for top + bottom */
    flex flex-col items-center justify-center
    overflow-hidden
     rounded-4xl
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
          {mapData.map((country, index) => (
            <path
              key={index}
              d={country["d"]}
              className={`country ${country.isRed ? "red" : ""}`}
              onClick={() => handleCountryClick(country)}
            >
              <title>{country["name"] || country["id"]}</title>
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

       <div className="relative"> <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="appearance-none border border-[#D2D2D2] rounded-full min-w-3xs px-4 py-2 text-[#455E86] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#F4C600] cursor-pointer" > {/* Dynamically merge countries + selected one if missing */} {[...new Set([...countries, selectedCountry])].map((country) => ( <option key={country} value={country}> {country} </option> ))} </select> <span className="absolute right-4 top-2.5 text-[#455E86] pointer-events-none"> ▼ </span> </div> </div>

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
              {(coverageData[selectedCountry] || generalCoverageData).map(
                (item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#D2D2D2] text-[#6B7280]"
                  >
                    <td className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
                      {item.carrier}
                    </td>
                    <td className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
                      {item.code}
                    </td>
                    <td className="py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
                      {item.speed}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default CoverageSection;

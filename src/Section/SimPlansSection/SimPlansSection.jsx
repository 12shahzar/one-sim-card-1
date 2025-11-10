import React, { useState } from "react";
import simOptions from "../../data/simOptions.json";
import planData from "../../data/planData.json";

export default function SimPlansSection() {
  // ✅ Default values
  const [selectedSim, setSelectedSim] = useState("1");
  const [selectedCountry, setSelectedCountry] = useState("Equatorial Guinea");

  // Dynamic data fetching based on selection
  const currentPlans =
    planData[selectedCountry]?.[selectedSim]?.plans || [];
  const currentSmsPlans =
    planData[selectedCountry]?.[selectedSim]?.sms || [];

  return (
    <div className="rounded-4xl border border-slate-200 p-8 flex flex-col gap-10 font-sora">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SIM Selector */}
        <div>
          <p className="font-regular text-lg text-[#08080C] mb-2">
            Select Number of SIMs
          </p>
          <div className="relative w-full">
            <select
              value={selectedSim}
              onChange={(e) => setSelectedSim(e.target.value)}
              className="appearance-none w-full border border-[#D2D2D2] rounded-full px-4 py-3 text-[#455E86] text-lg font-medium bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F4C600]"
            >
              {simOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-3 text-[#455E86] pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        {/* Country Selector */}
        <div>
          <p className="font-regular text-lg text-[#08080C] mb-2">
            Select Country
          </p>
          <div className="relative w-full">
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedSim("1"); // ✅ reset to default SIM on country change
              }}
              className="appearance-none w-full border border-[#D2D2D2] rounded-full px-4 py-3 text-[#455E86] text-lg font-medium bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F4C600]"
            >
              {Object.keys(planData).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-3 text-[#455E86] pointer-events-none">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <h2 className="text-center font-bold text-base text-[#4A6590]">
        Available Plans
      </h2>

      {currentPlans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {currentPlans.map((p, i) => (
            <div
              key={i}
              className="rounded-4xl bg-[#FBFBFB] py-8 text-center text-lg text-[#4A6590] max-w-xs w-full"
            >
              <p className="text-base mb-2 font-bold">{p.label}</p>
              <p className="font-bold text-2xl">{p.price}</p>
              <p className="text-base mt-2 font-regular">{selectedCountry}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No plans available for this selection.
        </p>
      )}

      {/* SMS Plans */}
      {currentSmsPlans.length > 0 && (
        <div className="pt-4">
          <h2 className="text-center font-bold text-base text-[#4A6590] my-5">
            SMS Plans
          </h2>
          <div className="flex justify-center flex-wrap gap-6">
            {currentSmsPlans.map((sms, i) => (
              <div
                key={i}
                className="rounded-4xl bg-[#FBFBFB] py-8 text-center text-lg text-[#4A6590] max-w-xs w-full"
              >
                <p className="text-base mb-2 font-bold">{sms.label}</p>
                <p className="font-bold text-2xl">{sms.price}</p>
                <p className="text-base mt-2 font-regular">{selectedCountry}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

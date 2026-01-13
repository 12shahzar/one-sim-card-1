import React, { useState, useEffect } from "react";
import { getCountries, getOperatorsAndPlans } from "../../api/apiService";
import simOptions from "../../data/simOptions.json";

export default function SimPlansSection() {
  const [selectedSim, setSelectedSim] = useState("1");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch countries on mount
  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data || []);
        if (data?.length > 0) {
          setSelectedCountry(data[0]); // Default to first country
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchAllCountries();
  }, []);

  // Fetch plans when country changes
  useEffect(() => {
    if (selectedCountry) {
      const fetchPlans = async () => {
        setLoading(true);
        try {
          const data = await getOperatorsAndPlans(selectedCountry);
          setPlans(data?.plans || []);
        } catch (error) {
          console.error("Error fetching plans:", error);
          setPlans([]);
        } finally {
          setLoading(false);
        }
      };
      fetchPlans();
    }
  }, [selectedCountry]);

  const dataPlans = plans?.filter((p) => p?.type === "data") || [];
  const smsPlans = plans?.filter((p) => p?.type === "sms") || [];

  const getPlanStyles = (plan) => {
    const groupTitle = plan?.groupTitle || "";
    const isSingleCountry = (plan?.included_countries || "").split(",").length === 1;

    if (groupTitle.includes("EU+") || groupTitle.includes("North America")) {
      return "bg-[#E3F2FD] border-[#2196F3] text-[#1976D2]"; // Blue
    } else if (groupTitle.includes("USA and Canada")) {
      return "bg-[#BDBDBD] border-[#616161] text-[#212121]"; // Dark Grey
    } else if (groupTitle.includes("World")) {
      return "bg-[#FAFAFA] border-[#BDBDBD] text-[#424242]"; // Light Gray
    } else if (isSingleCountry) {
      return "bg-[#FFFDE7] border-[#FBC02D] text-[#F57F17]"; // Yellow
    }
    return "bg-[#FBFBFB] border-slate-200 text-[#4A6590]"; // Default
  };

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
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="appearance-none w-full border border-[#D2D2D2] rounded-full px-4 py-3 text-[#455E86] text-lg font-medium bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F4C600]"
            >
              {countries?.map((country) => (
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

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4C600] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading plans...</p>
        </div>
      ) : (
        <>
          {/* Data Plans */}
          <div>
            <h2 className="text-center font-bold text-base text-[#4A6590] mb-6 uppercase tracking-wider">
              Data Plans
            </h2>
            {dataPlans.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {dataPlans.map((p, i) => (
                  <a
                    key={i}
                    href={`https://www.onesimcard.com/tools/iot_web_order.php?sims=${selectedSim}&plan=${p?.addonplanid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-4xl border-2 py-8 px-4 text-center text-lg transition-transform hover:scale-105 max-w-xs w-full block ${getPlanStyles(p)}`}
                  >
                    <p className="text-base mb-2 font-bold">{p?.name || p?.groupTitle}</p>
                    <p className="font-bold text-2xl">${p?.price}</p>
                    <p className="text-xs mt-4 opacity-70">Click to Order</p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No data plans available.</p>
            )}
          </div>

          {/* SMS Plans */}
          {smsPlans.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h2 className="text-center font-bold text-base text-[#4A6590] mb-6 uppercase tracking-wider">
                SMS Plans
              </h2>
              <div className="flex justify-center flex-wrap gap-6">
                {smsPlans.map((sms, i) => (
                  <a
                    key={i}
                    href={`https://www.onesimcard.com/tools/iot_web_order.php?sims=${selectedSim}&plan=${sms?.addonplanid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-4xl border-2 py-8 px-4 text-center text-lg transition-transform hover:scale-105 max-w-xs w-full block ${getPlanStyles(sms)}`}
                  >
                    <p className="text-base mb-2 font-bold">{sms?.name || sms?.groupTitle}</p>
                    <p className="font-bold text-2xl">${sms?.price}</p>
                    <p className="text-xs mt-4 opacity-70">Click to Order</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

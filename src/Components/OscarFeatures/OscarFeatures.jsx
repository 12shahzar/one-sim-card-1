import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

const featureData = [
  {
    title: "General Management",
    features: [
      { text: "Activate SIM Cards", payg: true, pooled: true },
      { text: "Suspend/Un-Suspend any SIM card", payg: true, pooled: true },
      { text: "Assign administrators to specific groups of SIM cards", payg: true, pooled: true },
      { text: "Assign various user rights to accounts administrators", payg: true, pooled: true },
      { text: "Send/Receive SMS directly from portal at reduced cost", payg: true, pooled: true },
      { text: "Basic Troubleshooting including Geo-Location, SIM network reconnect, and Active Session information", payg: true, pooled: true },
      { text: "Lock SIMs to a particular IMEI", payg: true, pooled: true },
      { text: 'Assign "nicknames" to SIM cards for easier management', payg: true, pooled: true },
      { text: "Set SIM card Data Connection options and limits", payg: false, pooled: true },
      { text: "Set SIM card funding options and limits", payg: true, pooled: false },
      { text: "Usage Alarms", payg: true, pooled: true },
    ],
  },
  {
    title: "Simplified SIM Funding",
    features: [
      { text: "Set up SIM cards to Auto Recharge from main M2M Account balance", payg: true, pooled: false },
      { text: "Move funds from one SIM to another", payg: true, pooled: false },
      { text: "Purchase additional SIM cards", payg: true, pooled: true },
      { text: "Add funds to existing SIM cards", payg: true, pooled: false },
      { text: "Numerous payment options", payg: true, pooled: false },
    ],
  },
  {
    title: "Views",
    features: [
      { text: "SIM cards with Data Package to be activated when traffic starts moving", payg: true, pooled: false },
      { text: "SIM cards with data packages scheduled to get activated later", payg: true, pooled: false },
      { text: "SIM with the balance below X", payg: true, pooled: false },
      { text: "SIM cards with the data usage over the last X DAYS above YMB", payg: true, pooled: false },
      { text: "SIM Cards by spending – Top X% in 30 days", payg: true, pooled: false },
      { text: "SIM cards that reached monthly additions limit", payg: true, pooled: false },
      { text: "SIM cards 10% below monthly additions limit", payg: true, pooled: false },
      { text: "Quick overview of your account", payg: true, pooled: false },
      { text: "Overall account health status report of services", payg: true, pooled: true },
      { text: "3 Month data usage graph", payg: true, pooled: true },
      { text: "Top 10 SIMs by data or SMS consumption", payg: true, pooled: true },
      { text: "Meter indicating amount of data remaining in the pool", payg: false, pooled: true },
      { text: "World map showing where your SIMs are registered", payg: true, pooled: true },
      { text: "Charts indicating status of SIMs (e.g. Active Vs. Blocked Vs. Ready for Activation)", payg: true, pooled: true },
    ],
  },
];


export default function OscarFeatures() {
  const [openSection, setOpenSection] = useState("General Management");

  return (
    <div className=" bg-white rounded-4xl p-6 sm:p-10 font-sora border border-[#D2D2D2]">
      {/* Header Row */}
      <div className="grid grid-cols-12 items-center py-3 text-xl font-regular text-[#08080C]">
        <div className="col-span-6">OSCAR Features</div>
        <div className="text-right col-span-3">PAYG Account</div>
        <div className="text-right col-span-3">Pooled Account</div>
      </div>

      {featureData.map((section) => (
        <div key={section.title}>
          {/* Section Header */}
          <button
            onClick={() =>
              setOpenSection(
                openSection === section.title ? null : section.title
              )
            }
            className={`flex justify-between items-center w-full px-6 py-4 my-5 text-white font-med text-base text-left transition rounded-4xl ${openSection === section.title
                ? "bg-[#4A6590]/95"
                : "bg-[#4A6590] hover:bg-[#4A6590]"
              }`}
          >
            <span>{section.title}</span>
            {openSection === section.title ? (
              <ChevronDown size={26} className="cursor-pointer" />
            ) : (
              <ChevronRight size={26} className="cursor-pointer"  />
            )}
          </button>

          {/* Section Content */}
          {openSection === section.title && section.features.length > 0 && (
            <div className="divide-y space-y-6 divide-[#D2D2D2]">
              {section.features.map((feature, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 items-center py-3 text-base text-[#6B7280] font-regular"
                >
                  <div className="col-span-6">{feature.text}</div>

                  <div className="col-span-3 flex justify-self-end md:mr-10">
                    {feature.payg && (
                      <Check className="bg-[#F4C600] rounded-full p-1 stroke-white" size={26} />
                    )}
                  </div>

                  <div className="col-span-3 flex justify-self-end md:mr-10">
                    {feature.pooled && (
                      <Check className="bg-[#F4C600] rounded-full p-1 stroke-white" size={26} />
                    )}
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

const featureData = [
  {
    title: "General Management",
    features: [
      { text: "Activate IoT SIM cards", payg: true, pooled: true },
      { text: "Suspend/Un-Suspend any IoT SIM card", payg: true, pooled: true },
      { text: "Assign administrators to specific groups of IoT SIM cards", payg: true, pooled: true },
      { text: "Assign various user rights to accounts administrators", payg: true, pooled: true },
      { text: "Send/Receive SMS directly from portal at reduced cost", payg: true, pooled: true },
      { text: "Basic Troubleshooting including Geo-Location, SIM network reconnect, and Active Session information", payg: true, pooled: true },
      { text: "Lock IoT SIM cards to a particular IMEI", payg: true, pooled: true },
      { text: 'Assign "nicknames" to IoT SIM cards for easier management', payg: true, pooled: true },
      { text: "Set IoT SIM card data connection options and limits", payg: false, pooled: true },
      { text: "Set IoT SIM card funding options and limits", payg: true, pooled: false },
      { text: "Usage Alarms", payg: true, pooled: true },
    ],
  },
  {
    title: "Simplified SIM Funding",
    features: [
      { text: "Set up IoT SIM cards to Auto Recharge from main M2M account balance", payg: true, pooled: false },
      { text: "Move funds from one IoT SIM card to another", payg: true, pooled: false },
      { text: "Purchase additional IoT SIM cards", payg: true, pooled: true },
      { text: "Add funds to existing IoT SIM cards", payg: true, pooled: false },
      { text: "Numerous payment options", payg: true, pooled: false },
    ],
  },
  {
    title: "Views",
    features: [
      { text: "IoT SIM cards with data package to be activated when traffic starts moving", payg: true, pooled: false },
      { text: "IoT SIM cards with data packages scheduled to get activated later", payg: true, pooled: false },
      { text: "IoT SIM cards with the balance below X", payg: true, pooled: false },
      { text: "IoT SIM cards with the data usage over the last X days above Y MB", payg: true, pooled: false },
      { text: "IoT SIM cards by spending – Top X% in 30 days", payg: true, pooled: false },
      { text: "IoT SIM cards that reached monthly additions limit", payg: true, pooled: false },
      { text: "IoT SIM cards 10% below monthly additions limit", payg: true, pooled: false },
      { text: "Quick overview of your account", payg: true, pooled: false },
      { text: "Overall account health status report of services", payg: true, pooled: true },
      { text: "3 Month data usage graph", payg: true, pooled: true },
      { text: "Top 10 IoT SIM cards by data or SMS consumption", payg: true, pooled: true },
      { text: "Meter indicating amount of data remaining in the pool", payg: false, pooled: true },
      { text: "World map showing where your IoT SIM cards are registered", payg: true, pooled: true },
      { text: "Charts indicating status of IoT SIM cards (e.g. Active Vs. Blocked Vs. Ready for Activation)", payg: true, pooled: true },
    ],
  },
];


export default function OscarFeatures() {
  const [openSection, setOpenSection] = useState("General Management");

  return (
    <div className=" bg-white rounded-4xl p-6 sm:p-10 font-sora border border-[#D2D2D2]">
      {/* Header Row */}
      <div className="grid grid-cols-12 items-center py-3 text-base md:text-xl font-regular text-[#08080C]">
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
            className={`flex justify-between items-center w-full px-6 py-4 my-5 text-white font-medium text-base text-left transition rounded-4xl ${openSection === section.title
              ? "bg-[#4A6590]/95"
              : "bg-[#4A6590] hover:bg-[#4A6590]"
              }`}
          >
            <span>{section.title}</span>
            {openSection === section.title ? (
              <ChevronDown size={26} className="cursor-pointer" />
            ) : (
              <ChevronRight size={26} className="cursor-pointer" />
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

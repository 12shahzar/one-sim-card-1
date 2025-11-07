import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

const featureData = [
  {
    title: "General Management",
    features: [
      "Activate SIM Cards",
      "Suspend/Un-Suspend any SIM card",
      "Assign administrators to specific groups of SIM cards",
      "Assign various user rights to accounts administrators",
      "Send/Receive SMS directly from portal at reduced cost",
      "Basic Troubleshooting including Geo-Location, SIM network reconnect, and Active Session information",
      "Lock SIMs to a particular IMEI",
      'Assign "nicknames" to SIM cards for easier management',
      "Set SIM card Data Connection options and limits",
      "Set SIM card funding options and limits",
      "Usage Alarms",
    ],
  },
  {
    title: "Simplified SIM Funding",
    features: [
      "Automatic SIM top-up based on balance thresholds",
      "Manual funding directly from dashboard",
      "Funding multiple SIMs in bulk",
      "Adjust funding limits per user group",
      "Funding history with filters and export option",
      "Real-time balance synchronization across accounts",
    ],
  },
  {
    title: "Views",
    features: [
      "Detailed SIM overview with active/inactive status",
      "Filter and search by country, operator, or status",
      "Group SIMs by account, plan, or usage type",
      "Export filtered SIM data to CSV or Excel",
      "Quick view for most active SIMs and top data users",
      "Custom column display and sorting options",
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
            className={`flex justify-between items-center w-full px-6 py-4 my-5 text-white font-med text-base text-left transition rounded-4xl ${
              openSection === section.title
                ? "bg-[#4A6590]/95"
                : "bg-[#4A6590] hover:bg-[#4A6590]"
            }`}
          >
            <span>{section.title}</span>
            {openSection === section.title ? (
              <ChevronDown size={26} />
            ) : (
              <ChevronRight size={26} />
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
                  <div className="col-span-6 ">{feature}</div>
                  <div className="col-span-3 flex justify-self-end md:mr-10">
                    <Check  className="bg-[#F4C600] rounded-full p-1  stroke-white" size={26} />
                  </div>
                  <div className="col-span-3 flex justify-self-end md:mr-10">
                    <Check  className="bg-[#F4C600] rounded-full p-1  stroke-white" size={26} />
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

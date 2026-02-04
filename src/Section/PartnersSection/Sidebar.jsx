import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar({
  sections,
  activeSection,
  activeId,
  openSections,
  onToggleSection,
  onSelectItem,
}) {
  return (
    <aside className="w-full lg:w-96 mx-2 md:mx-0">
      <div className="bg-white rounded-4xl p-4 md:p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)] ">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-6">
            <button
              onClick={() => onToggleSection(section.header)}
              className="w-full flex justify-between items-center text-[#08080C] font-medium text-2xl mb-3"
            >
              {section.header}
              <div className="flex items-center gap-2 text-xl">
                <span className="text-[#6B7280]">{section.count}</span>
                {openSections[section.header] ? (
                  <ChevronUp
                    size={26}
                    className="bg-[#455E86] rounded-full p-1 stroke-white"
                  />
                ) : (
                  <ChevronDown
                    size={26}
                    className="bg-[#F4C600] rounded-full p-1 stroke-white"
                  />
                )}
              </div>
            </button>

            {openSections[section.header] && (
              <>
                <ul className="space-y-2">
                  {Array.isArray(section.items) && section.items.map((item) => (
                    <li key={item.item_id_str}>
                      <button
                        onClick={() => onSelectItem(section.header, item.item_id_str)}
                        className={`w-full text-left px-3 py-1 text-base transition-colors flex items-center gap-2 cursor-pointer ${activeId === item.item_id_str &&
                          activeSection === section.header
                          ? "text-[#455E86]"
                          : "text-[#6B7280]"
                          }`}
                      >
                        {activeId === item.item_id_str &&
                          activeSection === section.header && (
                            <span className="text-[#455E86]">•</span>
                          )}
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <hr className="border-[#E5E7EB] mt-4" />
              </>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

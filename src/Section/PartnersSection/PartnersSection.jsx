import React, { useState, useEffect } from "react";
import partnersData from "../../data/partnersData.json";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PartnersSection() {
  
  const sections = partnersData.sections || [];
  const [activeSection, setActiveSection] = useState(sections[0]?.header);
  const [activeId, setActiveId] = useState(sections[0]?.items?.[0]?.id);
  const [activeItem, setActiveItem] = useState(sections[0]?.items?.[0]);
  const [expandedTables, setExpandedTables] = useState({});
  const [openSections, setOpenSections] = useState({
    [sections[0]?.header]: true,
  });

  // Find the currently selected section and item
  useEffect(() => {
    const currentSection = sections.find((s) => s.header === activeSection);
    const foundItem = currentSection?.items?.find((i) => i.id === activeId);
    setActiveItem(foundItem);
    setExpandedTables({});
  }, [activeId, activeSection, sections]);

  // toggle table expand
  const toggleTable = (idx) => {
    setExpandedTables((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // toggle section collapse
  const toggleSection = (header) => {
    setOpenSections((prev) => ({
      ...prev,
      [header]: !prev[header],
    }));
  };

  return (
    <section className="max-w-screen-xl mx-auto py-16 font-sora">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-96 mx-2 md:mx-0">
          <div className="bg-white rounded-4xl p-2 md:p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)] overflow-y-auto max-h-[80vh]">
            {sections.map((section, sIdx) => (
              <div key={sIdx} className="mb-6">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.header)}
                  className="w-full flex justify-between items-center text-[#08080C] font-medium text-2xl mb-3"
                >
                  {section.header}
                  <div className="flex items-center gap-2 text-xl">
                    <span className="text-[#6B7280]">{section.count}</span>
                    {openSections[section.header] ? (
                      <ChevronUp
                        size={26}
                        className="bg-[#455E86] rounded-full p-1  stroke-white"
                      />
                    ) : (
                        <ChevronDown
                        size={26}
                        className="bg-[#F4C600] rounded-full p-1  stroke-white"
                      />
                    )}
                  </div>
                </button>

                {/* Section Items */}
                {openSections[section.header] && (
                  <>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setActiveSection(section.header);
                              setActiveId(item.id);
                            }}
                            className={`w-full text-left px-3 py-1 text-base transition-colors flex items-center gap-2 font-regular  ${
                              activeId === item.id &&
                              activeSection === section.header
                                ? "text-[#455E86] "
                                : "text-[#6B7280]"
                            }`}
                          >
                            {activeId === item.id &&
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

        {/* MAIN CONTENT */}
        <div className="flex-1 p-2 md:p-8">
          {activeItem ? (
            <>
              <h2 className="text-2xl md:text-5xl font-thin text-[#08080C] mb-4">
                {activeItem.label}
              </h2>

              {activeItem.image && (
                <img
                  src={activeItem.image}
                  alt={activeItem.label}
                  className="w-48 mb-8"
                />
              )}

              {activeItem.intro && (
                <p className="text-[#6B7280] mb-8">{activeItem.intro}</p>
              )}

              {activeItem.tables?.map((table, idx) => {
                const isExpanded = expandedTables[idx];
                const visibleItems = isExpanded
                  ? table.items
                  : table.items.slice(0, 11);

                return (
                  <div
                    key={idx}
                    className="mb-10 bg-white rounded-4xl p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)]"
                  >
                    {table.heading && (
                      <h3 className="text-2xl font-medium mb-10 text-[#08080C]">
                        {table.heading}
                      </h3>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-7 text-[#455E86] text-base font-regular">
                      {visibleItems.map((item, tIdx) => (
                        <p key={tIdx}>{item}</p>
                      ))}
                    </div>

                    {table.items.length > 11 && (
                      <div className="mt-10">
                        <CustomButton
                          text={isExpanded ? "View Less" : "View More"}
                          bgColor="#455E86"
                          hoverColor="#3b5072"
                          textColor="white"
                          onClick={() => toggleTable(idx)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-[#6B7280]">Select an item to view details.</p>
          )}
        </div>
      </div>
    </section>
  );
}

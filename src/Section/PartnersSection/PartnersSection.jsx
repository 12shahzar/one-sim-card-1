import React, { useState, useEffect } from "react";
import partnersData from "../../data/partnersData.json";
import CustomButton from "../../Components/CustomButton/CustomButton";

export default function PartnersSection() {
    
  const group = partnersData.group;
  const [activeId, setActiveId] = useState(group.items[0]?.id);
  const [activeItem, setActiveItem] = useState(group.items[0]);
  const [expandedTables, setExpandedTables] = useState({}); // for remembering which tables are expanded

  useEffect(() => {
    setActiveItem(group.items.find((i) => i.id === activeId));
    setExpandedTables({}); // reset expansion when changing tab
  }, [activeId, group.items]);

  // toggle expansion for a table
  const toggleTable = (idx) => {
    setExpandedTables((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="max-w-screen-xl mx-auto py-16 font-sora">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-96">
          <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-4xl p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
            <h3 className="text-[#08080C] font-sora font-medium text-2xl mb-4 flex justify-between">
              {group.header}{" "}
              <span className="text-[#F4C600] text-xl">{group.count}</span>
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left px-3 py-2 text-base transition-colors flex items-center gap-2 ${
                      activeId === item.id
                        ? "text-[#455E86] font-medium"
                        : "text-[#6B7280]"
                    }`}
                  >
                    {activeId === item.id && (
                      <span className="text-[#455E86]">–</span>
                    )}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl md:text-5xl font-thin text-[#08080C] mb-4">
            {activeItem?.label}
          </h2>

          {activeItem?.image && (
            <img
              src={activeItem.image}
              alt={activeItem.label}
              className="w-48 mb-8"
            />
          )}

          {activeItem?.intro && (
            <p className="text-[#6B7280] mb-8">{activeItem.intro}</p>
          )}

          {/* TABLES WITH INDIVIDUAL BUTTONS */}
          {activeItem?.tables?.map((table, idx) => {
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
        </div>
      </div>
    </section>
  );
}

import React from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";

export default function DataTable({ tables, expandedTables, onToggleTable }) {
  // Tables that should show all items (no View More button)
  const fullDisplayTables = [
    "Compatible Device Manufacturers",
    "Software Providers",
    "Compatible Devices",
    "Compatible Software"
  ];

  return (
    <>
      {tables?.map((table, idx) => {
        const showFullList = fullDisplayTables.includes(table.heading);
        const isExpanded = showFullList || expandedTables[idx];
        const visibleItems = isExpanded
          ? table.items
          : table.items.slice(0, 11);

        return (
          <div
            key={idx}
            className="mb-10 bg-white rounded-4xl p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_90px_rgba(0,0,0,0.08)]"
            style={{
              animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
            }}
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

            {/* Only show View More button for tables that are NOT in fullDisplayTables */}
            {!showFullList && table.items.length > 11 && (
              <div className="mt-10">
                <CustomButton
                  text={isExpanded ? "View Less" : "View More"}
                  bgColor="#455E86"
                  hoverColor="#3b5072"
                  textColor="white"
                  onClick={() => onToggleTable(idx)}
                />
              </div>
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

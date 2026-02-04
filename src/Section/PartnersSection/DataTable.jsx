import React from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";

export default function DataTable({ tables, expandedTables, onToggleTable }) {
  return (
    <>
      {tables?.map((table, idx) => {
        const isExpanded = expandedTables[idx];
        const visibleItems = isExpanded
          ? (table?.items || [])
          : (table?.items || []).slice(0, 11);

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

            {Array.isArray(table?.items) && table.items.length > 11 && (
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
    </>
  );
}

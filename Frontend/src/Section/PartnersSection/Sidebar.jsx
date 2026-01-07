import React, { useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar({
  sections,
  activeSection,
  activeId,
  openSections,
  onToggleSection,
  onSelectItem,
}) {
  // Inject animation styles
  useEffect(() => {
    if (!document.getElementById('sidebar-animations')) {
      const style = document.createElement("style");
      style.id = 'sidebar-animations';
      style.textContent = `
        @keyframes sidebarFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <aside className="w-full lg:w-96 mx-2 md:mx-0">
      <div className="bg-white rounded-4xl p-4 md:p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
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

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections[section.header]
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li
                    key={item.id}
                    style={{
                      animation: openSections[section.header]
                        ? `sidebarFadeIn 0.3s ease-in-out ${idx * 0.05}s both`
                        : "none",
                    }}
                  >
                    <button
                      onClick={() => onSelectItem(section.header, item.id)}
                      className={`w-full text-left px-3 py-1 text-base transition-colors flex items-center gap-2 cursor-pointer hover:text-[#455E86] ${
                        activeId === item.id &&
                        activeSection === section.header
                          ? "text-[#455E86]"
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
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

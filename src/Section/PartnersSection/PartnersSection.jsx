import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // for route info
import partnersData from "../../data/partnersData.json";
import SectionContent from "./SectionContent";
import DataTable from "./DataTable";
import Sidebar from "./sidebar";
import Details from "./Details";

export default function PartnersSection() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSectionFromRoute = queryParams.get("section"); // e.g., ?section=Partners

  const sections = partnersData.sections || [];

  // Determine the initial section based on route or fallback
  const initialSection =
    sections.find((s) => s.header === initialSectionFromRoute)?.header ||
    sections[0]?.header;

  const initialItem =
    sections.find((s) => s.header === initialSection)?.items?.[0] ||
    sections[0]?.items?.[0];

  const [activeSection, setActiveSection] = useState(initialSection);
  const [activeId, setActiveId] = useState(initialItem?.id);
  const [activeItem, setActiveItem] = useState(initialItem);
  const [expandedTables, setExpandedTables] = useState({});
  const [openSections, setOpenSections] = useState({
    [initialSection]: true, // expand the active section
  });

  useEffect(() => {
    const currentSection = sections.find((s) => s.header === activeSection);
    const foundItem = currentSection?.items?.find((i) => i.id === activeId);
    setActiveItem(foundItem);
    setExpandedTables({});
  }, [activeId, activeSection, sections]);

  const toggleTable = (idx) =>
    setExpandedTables((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const toggleSection = (header) =>
    setOpenSections((prev) => ({ ...prev, [header]: !prev[header] }));

const handleSelectItem = (section, id) => {
  setActiveSection(section);
  setActiveId(id);
  setOpenSections({ [section]: true }); // ensure only active section is open

  // 👇 Add this line
  window.scrollTo({ top: 0, behavior: "smooth" });
};


  const handleLearnMore = (categoryId) => {
    const currentSection = sections.find((s) => s.header === activeSection);
    const detailItem = currentSection?.items?.find(
      (i) =>
        i.id === categoryId ||
        (i.details && i.details.some((d) => d.id === categoryId))
    );

    if (detailItem) {
      setActiveId(detailItem.id);
    }
  };

  
  return (
    <section className="container mx-auto py-16 font-sora">
      <div className="flex flex-col lg:flex-row gap-8">
       <Sidebar
  sections={sections}
  activeSection={activeSection}
  activeId={activeId}
  openSections={openSections}
  onToggleSection={toggleSection}
  onSelectItem={handleSelectItem}
/>


        <div className="flex-1 p-2 md:p-8">
          {activeItem ? (
            <>
              <h2 className="text-2xl md:text-5xl font-thin text-[#08080C] mb-4">
                {activeSection === "Technology" ? "" : activeItem.label}
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

              <SectionContent
                sections={activeItem.section}
                intro={activeItem.intro}
                onLearnMore={handleLearnMore}
              />

              <Details details={activeItem.details} intro={activeItem.intro} />

              <DataTable
                tables={activeItem.tables}
                expandedTables={expandedTables}
                onToggleTable={toggleTable}
              />
            </>
          ) : (
            <p className="text-[#6B7280]">Select an item to view details.</p>
          )}
        </div>
      </div>
    </section>
  );
}

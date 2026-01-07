import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import partnersDataRaw from "../../data/partnersData.structured.json";
import { transformPartnersData } from "../../utils/transformPartnersData";
import SectionContent from "./SectionContent";
import DataTable from "./DataTable";
import Sidebar from "./Sidebar";
import Details from "./Details";
import axios from "axios";

export default function PartnersSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Transform normalized data to component-compatible format
  const partnersData = useMemo(() => {
    try {
      return transformPartnersData(partnersDataRaw);
    } catch (error) {
      console.error("Error transforming partners data:", error);
      return { sections: [] };
    }
  }, []);

  const sections = partnersData?.sections || [];

  // Get initial values safely
  const getInitialSection = () => sections[0]?.header || null;
  const getInitialItem = () => sections[0]?.items?.[0] || null;
  const getInitialId = () => sections[0]?.items?.[0]?.id || null;

  // State initialization
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [activeId, setActiveId] = useState(getInitialId);
  const [activeItem, setActiveItem] = useState(getInitialItem);
  const [expandedTables, setExpandedTables] = useState({});
  const [apiData, setApiData] = useState(null);

  const [openSections, setOpenSections] = useState(() => {
    const firstSectionHeader = getInitialSection();
    return firstSectionHeader ? { [firstSectionHeader]: true } : {};
  });

  // ⚡ Sync activeSection and activeId with route query params
  useEffect(() => {
    if (!sections || sections.length === 0) return;

    // Check both pathname and query params for section name
    const pathSection = location.pathname.replace(/^\//, ''); // Remove leading slash
    const sectionFromQuery = queryParams.get("section");
    const sectionFromRoute = sectionFromQuery || 
                             (pathSection && sections.find(s => s.header.toLowerCase() === pathSection.toLowerCase())?.header) ||
                             sections[0]?.header;
    const itemFromRoute = queryParams.get("item");

    const sectionObj =
      sections.find((s) => s.header === sectionFromRoute) || sections[0];
    
    if (!sectionObj || !sectionObj.items || sectionObj.items.length === 0) return;

    const itemObj =
      sectionObj.items.find((i) => i.id === itemFromRoute) ||
      sectionObj.items[0];

    if (itemObj) {
      // Only update if something actually changed to prevent unnecessary re-renders and scroll issues
      const shouldUpdate = 
        activeSection !== sectionObj.header || 
        activeId !== itemObj.id;

      if (shouldUpdate) {
        setActiveSection(sectionObj.header);
        setActiveId(itemObj.id);
        setActiveItem(itemObj);
        // Ensure the section is open when navigating to it
        setOpenSections((prev) => ({ ...prev, [sectionObj.header]: true }));
        setExpandedTables({});
        
        // Removed automatic scroll-to-top to allow user scrolling freely
      }
    }
  }, [location.search, location.pathname, sections, activeSection, activeId]);

  // Keep activeItem in sync when activeId or activeSection changes manually
  useEffect(() => {
    if (!sections || sections.length === 0 || !activeSection || !activeId) return;

    const currentSection = sections.find((s) => s.header === activeSection);
    if (!currentSection || !currentSection.items) return;

    const foundItem = currentSection.items.find((i) => i.id === activeId);
    if (foundItem) {
      setActiveItem(foundItem);
      setExpandedTables({});
    }
  }, [activeId, activeSection, sections]);

  const toggleTable = (idx) =>
    setExpandedTables((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const toggleSection = (header) =>
    setOpenSections((prev) => ({ ...prev, [header]: !prev[header] }));

  // ⚡ Update URL when selecting an item
  const handleSelectItem = (section, id) => {
    setActiveSection(section);
    setActiveId(id);
    // Preserve other open sections, but ensure the selected section is open
    setOpenSections((prev) => ({ ...prev, [section]: true }));

    navigate(`?section=${encodeURIComponent(section)}&item=${encodeURIComponent(id)}`, { replace: true });
    // Optional: Scroll to top only when explicitly selecting an item (not on route changes)
    // Uncomment if you want scroll-to-top on sidebar clicks:
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLearnMore = (categoryId) => {
    if (!sections || sections.length === 0 || !activeSection) return;

    const currentSection = sections.find((s) => s.header === activeSection);
    if (!currentSection || !currentSection.items) return;

    const detailItem = currentSection.items.find(
      (i) =>
        i.id === categoryId ||
        (i.details && i.details.some((d) => d.id === categoryId))
    );

    if (detailItem && detailItem.id) {
      handleSelectItem(activeSection, detailItem.id);
    }
  };

  // Clear API data when switching items, and fetch if new item has api_url
  useEffect(() => {
    // Clear API data first when switching items
    setApiData(null);

    // Only fetch if the current item has an api_url
    if (!activeItem?.api_url) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(activeItem.api_url);
        setApiData(res.data);
      } catch (error) {
        console.error("Axios Error:", error);
        setApiData(null); // Clear on error
      }
    };

    fetchData();
  }, [activeItem?.id, activeItem?.api_url]); // Only depend on id and api_url to avoid unnecessary fetches

  return (
    <section className="container mx-auto py-16 px-2 md:px-6 font-sora">
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
                {activeSection === "Technology" ? "" : activeItem?.label}
              </h2>

              {activeItem?.image && (
                <img
                  src={activeItem?.image}
                  alt={activeItem.label}
                  className="w-48 mb-8"
                />
              )}
              {activeItem?.intro && (
                <p className="text-[#6B7280] mb-8">{activeItem?.intro}</p>
              )}

              <SectionContent
                sections={activeItem?.section}
                intro={activeItem?.intro}
                onLearnMore={handleLearnMore}
              />

              <Details
                details={activeItem?.details}
                intro={activeItem?.intro}
              />
              <div className="flex flex-row items-start">
                {activeItem?.moreImage?.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item.image}
                      alt={`${activeItem?.label} ${index + 1}`}
                      className="w-48"
                    />
                  </a>
                ))}
              </div>

              {/* Only show API content if current item has api_url */}
              {activeItem?.api_url && apiData?.data?.content && (
                <div
                  dangerouslySetInnerHTML={{ __html: apiData.data.content }}
                />
              )}

              <DataTable
                tables={activeItem?.tables}
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

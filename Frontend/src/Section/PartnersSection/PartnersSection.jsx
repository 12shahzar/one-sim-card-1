import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import partnersData from "../../data/partnersData.json";
import SectionContent from "./SectionContent";
import DataTable from "./DataTable";
import Sidebar from "./Sidebar";
import Details from "./Details";
import { fetchByUrl } from "../../api/apiService";

export default function PartnersSection() {
  const location = useLocation();
  const navigate = useNavigate(); // Added navigate
  const queryParams = new URLSearchParams(location.search);

  const sections = partnersData.sections || [];

  // State initialization
  const [activeSection, setActiveSection] = useState(sections[0]?.header);
  const [activeId, setActiveId] = useState(sections[0]?.items?.[0]?.id);
  const [activeItem, setActiveItem] = useState(sections[0]?.items?.[0]);
  const [expandedTables, setExpandedTables] = useState({});
  const [apiData, setApiData] = useState(null);

  const [openSections, setOpenSections] = useState({
    [sections[0]?.header]: true,
  });

  // ⚡ Sync activeSection and activeId with route query params
  useEffect(() => {
    const sectionFromRoute = queryParams.get("section") || sections[0]?.header;
    const itemFromRoute = queryParams.get("item");

    const sectionObj =
      sections.find((s) => s.header === sectionFromRoute) || sections[0];
    const itemObj =
      sectionObj.items.find((i) => i.id === itemFromRoute) ||
      sectionObj.items[0];

    setActiveSection(sectionObj.header);
    setActiveId(itemObj.id);
    setActiveItem(itemObj);
    setOpenSections({ [sectionObj.header]: true });
    setExpandedTables({});

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search, sections]);

  // Keep activeItem in sync when activeId or activeSection changes manually
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

  // ⚡ Update URL when selecting an item
  const handleSelectItem = (section, id) => {
    setActiveSection(section);
    setActiveId(id);
    setOpenSections({ [section]: true });

    navigate(`?section=${section}&item=${id}`, { replace: true });
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
      handleSelectItem(activeSection, detailItem.id); // update URL and state
    }
  };

  useEffect(() => {
    if (!activeItem?.api_url) return;

    const fetchData = async () => {
      try {
        const data = await fetchByUrl(activeItem?.api_url);
        setApiData(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, [activeItem]);

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
                  alt={activeItem?.label}
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
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item?.image}
                      alt={`${activeItem?.label} ${index + 1}`}
                      className="w-48"
                    />
                  </a>
                ))}
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: apiData?.data?.content }}
              />

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

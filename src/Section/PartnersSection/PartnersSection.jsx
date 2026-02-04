import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionContent from "./SectionContent";
import DataTable from "./DataTable";
import Sidebar from "./Sidebar";
import Details from "./Details";
import { fetchByUrl, getPartnerSections, getPartnerItemDetails } from "../../api/apiService";

export default function PartnersSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // State initialization
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [expandedTables, setExpandedTables] = useState({});
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openSections, setOpenSections] = useState({});

  // 1. Fetch sections on mount
  useEffect(() => {
    const fetchSections = async () => {
      try {
        console.log("Fetching partner sections...");
        const result = await getPartnerSections();
        console.log("Partner sections result:", result);
        const apiSections = result.data || [];
        setSections(apiSections);

        if (apiSections.length > 0) {
          const sectionFromRoute = queryParams.get("section") || apiSections[0]?.header;
          const targetSection = apiSections.find((s) => s.header === sectionFromRoute) || apiSections[0];

          console.log("Initializing active section:", targetSection.header);
          setActiveSection(targetSection.header);
          setOpenSections({ [targetSection.header]: true });

          const itemFromRoute = queryParams.get("item");
          const targetItemId = itemFromRoute || targetSection.items?.[0]?.item_id_str;
          console.log("Initializing active ID:", targetItemId);
          setActiveId(targetItemId);
        }
      } catch (error) {
        console.error("Error fetching partner sections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  // 2. Sync with route params (when sections are ready)
  useEffect(() => {
    if (sections.length === 0) return;

    const sectionFromRoute = queryParams.get("section");
    const itemFromRoute = queryParams.get("item");

    if (sectionFromRoute) {
      setActiveSection(sectionFromRoute);
      setOpenSections((prev) => ({ ...prev, [sectionFromRoute]: true }));
    }
    if (itemFromRoute) {
      setActiveId(itemFromRoute);
    }
  }, [location.search, sections]);

  // 3. Fetch item details when activeId changes
  useEffect(() => {
    if (!activeId) return;

    const fetchDetails = async () => {
      try {
        console.log("Fetching details for item:", activeId);
        const result = await getPartnerItemDetails(activeId);
        console.log("Item details result:", result);
        setActiveItem(result?.data || null);
        setExpandedTables({});
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchDetails();
  }, [activeId]);

  const toggleTable = (idx) =>
    setExpandedTables((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const toggleSection = (header) =>
    setOpenSections((prev) => ({ ...prev, [header]: !prev[header] }));

  // ⚡ Update URL when selecting an item
  const handleSelectItem = (section, id) => {
    setActiveId(id);
    setActiveSection(section);
    setOpenSections((prev) => ({ ...prev, [section]: true }));

    navigate(`?section=${section}&item=${id}`, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLearnMore = (categoryId) => {
    console.log("handleLearnMore called with:", categoryId);
    const currentSection = sections.find((s) => s.header === activeSection);
    const detailItem = currentSection?.items?.find(
      (i) =>
        i.item_id_str === categoryId ||
        (Array.isArray(i.details) && i.details.some((d) => d.id === categoryId))
    );

    if (detailItem) {
      console.log("Found detail item for learn more:", detailItem.item_id_str);
      handleSelectItem(activeSection, detailItem.item_id_str); // update URL and state
    } else {
      console.warn("Could not find detail item for category:", categoryId);
    }
  };

  useEffect(() => {
    // Always clear old API data when the item changes
    setApiData(null);

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
                dangerouslySetInnerHTML={{ __html: apiData?.data?.content || "" }}
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

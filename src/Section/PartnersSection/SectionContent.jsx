import SectionHeading from "../../Components/Heading/SectionHeading";
import CategoriesGrid from "./CategoriesGrid";

export default function SectionContent({ sections, intro, onLearnMore }) {
  return (
    <>
      {Array.isArray(sections) && sections.map((section, i) => (
        <div key={i} className="">
          <SectionHeading title={section?.heading || ""} align="left" />
          {intro && <p className="text-[#6B7280]">{intro}</p>}
          <CategoriesGrid categories={section?.categories} onLearnMore={onLearnMore} />
          <hr className="border-[#D2D2D2] my-12" />
        </div>
      ))}
    </>
  );
}

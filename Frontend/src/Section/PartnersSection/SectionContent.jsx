import SectionHeading from "../../Components/Heading/SectionHeading";
import CategoriesGrid from "./CategoriesGrid";

export default function SectionContent({ sections, intro, onLearnMore }) {
  return (
    <>
      {sections?.map((section, i) => (
        <div
          key={i}
          className="animate-fade-in-up"
          style={{
            animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
          }}
        >
          <SectionHeading title={section.heading} align="left" />
          {intro && <p className="text-[#6B7280]">{intro}</p>}
          <CategoriesGrid
            categories={section.categories}
            onLearnMore={onLearnMore}
          />
          <hr className="text-[#D2D2D2] my-12" />
        </div>
      ))}
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

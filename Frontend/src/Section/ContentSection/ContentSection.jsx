import React from "react";
import SectionHeading from "../../Components/Heading/SectionHeading";

const ContentSection = ({ title, paragraphs, aosAnimation = "fade-down" }) => {
  return (
    <section
      data-aos={aosAnimation}
      className="max-w-screen-xl mx-auto pt-14 font-sora  px-2 md:px-6"
    >
      {/* Header */}
      <div className="text-left mb-5">
        <SectionHeading title={title} align="left" />
      </div>

      {/* Description */}
      <div className="space-y-4 pr-2 md:pr-28">
        {paragraphs?.map((text, index) => (
          <p
            key={index}
            className="text-[#6B7280] font-sora text-base font-normal"
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ContentSection;

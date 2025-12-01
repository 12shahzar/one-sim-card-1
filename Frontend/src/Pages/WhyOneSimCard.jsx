import React from "react";
import SectionHeading from "../Components/Heading/SectionHeading";
import cardsData from "../data/whyonesim.json";

function WhyOneSimCard() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-2 md:px-6 font-sora">
      {/* Section Heading */}
      <SectionHeading title="Why OneSimCard?" align="left" />

      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8" data-aos="fade-left">
        {cardsData.map((card) => (
          <div key={card.id} className="flex flex-col items-start gap-1">
            <img
              src={card.icon}
              alt={card.label}
              className="w-16 h-16 flex-shrink-0 my-2"
            />
            <div className="pr-2 md:pr-24">
              <p className="text-[#000000] text-lg font-regular">
                {card.label}
              </p>
              <p className="text-[#6B7280] text-sm mt-1">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyOneSimCard;

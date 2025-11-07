import React from "react";
import FaqSection from "../Section/FaqSection/FaqSection";
import Common_Banner from "../Components/Banner/Common_Banner";
import PartnersSection from "../Section/PartnersSection/PartnersSection";

function PremierPartners() {
  return (
    <>
      <Common_Banner
        titleFirst="Technolo"
        titleLast="gy"
        breadcrumb="Premier Partners"
      />
      <PartnersSection />
      <FaqSection />
    </>
  );
}

export default PremierPartners;

import React from "react";
import Common_Banner from "../Components/Banner/Common_Banner";
import FaqSection from "../Section/FaqSection/FaqSection";
import OscarFeatures from "../Components/OscarFeatures/OscarFeatures";
import CustomButton from "../Components/CustomButton/CustomButton";
import SectionHeading from "../Components/Heading/SectionHeading";

function OSCARIoTSIMCardManagementPortal() {
  return (
    <>
      <Common_Banner
        titleFirst="Why OneSim"
        titleLast="Card"
        breadcrumb="OSCAR IoT SIM Card Management Portal"
      />
      <div className="py-16 max-w-7xl mx-auto" data-aos="fade-right">
        <div className="mb-4">
          <SectionHeading title="OSCAR IoT SIM Card Management Portal" />
        </div>
        <OscarFeatures />
        <div className="py-16 flex justify-between">
          <CustomButton
            text={"Buy IoT Starter Kit"}
            bgColor="#455E86"
            hoverColor="#3b5072"
            textColor="white"
          />
          <CustomButton text={"Request A Quote"} />
        </div>
      </div>
 
      <FaqSection />
    </>
  );
}

export default OSCARIoTSIMCardManagementPortal;

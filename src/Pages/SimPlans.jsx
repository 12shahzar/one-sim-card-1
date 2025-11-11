import React from "react";
import SimPlansSection from "../Section/SimPlansSection/SimPlansSection";
import SectionHeading from "../Components/Heading/SectionHeading";

export default function SimPlans() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 md:px-0">
      <SectionHeading title={"Consumer Global IoT Connectivity"} align="left" />
      <p className="text-[#08080C] mt-2 font-medium text-2xl my-5">
        IoT SIM Card For Global Connectivity | Secure M2M & Prepaid IoT SIM
        Plans
      </p>
      <SimPlansSection />
    </div>
  );
}

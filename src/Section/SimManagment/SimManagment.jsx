import React from "react";
import simCalculator from "../../assets/images/sim_Managment.svg";
import FeatureSection from "../../Components/FeatureComponent/FeatureSection";

function SimManagment() {
  return (
    <>
      <FeatureSection
        title="IoT SIM Portal"
        subtitle="Management"
        description="A single portal and API capabilities to manage all your Global IoT SIM Card deployments. Providing complete control over all aspects of connectivity."
        buttonText="IoT SIM Management"
        imageSrc={simCalculator}
        imageAlt="SIM Management"
        reverse={false}
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#455E86"
        btnHoverColor="#3b5072"
        btnTextColor="#ffffff"
        btnRedirect={'/EasySIMManagement'}
      />
    </>
  );
}

export default SimManagment;

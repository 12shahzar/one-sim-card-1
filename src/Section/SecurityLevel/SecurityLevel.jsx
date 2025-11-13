import React from "react";
import security from "../../assets/images/unsurpassed.svg";
import FeatureSection from "../../Components/FeatureComponent/FeatureSection";

function SecurityLevel() {
  return (
    <>
      <FeatureSection
        title="Security"
        subtitle="Unsurpassed"
        buttonText="IMEI LOCK"
        imageSrc={security}
        description="Protecting your IoT deployment and data through a variety of security features such as Private APN, VPN, Static IP’s, & IMEI Lock."
        reverse={true}
        subtitleColor="#F3C500"
        imageAlt="Security Level"
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#F3C500"
        btnHoverColor="#e2b900"
        btnTextColor="#08080C"
      />
    </>
  );
}

export default SecurityLevel;

import React from "react";
import Common_Banner from "../Components/Banner/Common_Banner";
import FaqSection from "../Section/FaqSection/FaqSection";
import ContentSection from "../Section/ContentSection/ContentSection";
import FeatureSection from "../Components/FeatureComponent/FeatureSection";
import Fleet_managment from "../assets/images/Fleet_managment.svg";

function IoTSolutionsFleet() {
  return (
    <>

      <div className="pb-16">
        <ContentSection
          title="Fleet Management Solutions"
          paragraphs={[
            "Transportation telematics have become a vital component in the managing of an efficient and cost effective fleet. Whether it is cutting down idle times, increasing delivery performance or better managing fuel usage, drive times or vehicle maintenance, telematics now plays a mission critical role and is a key factor in both controlling and reducing costs and expenses.",
            "OneSimCard M2M and its IoT platform offers the fleet management industry advanced IoT solutions, products and services to optimize their businesses and use their vehicles in the most efficient manner possible. The OneSimCard M2M Global IoT SIM card was specifically designed for Fleet Management Solutions with outstanding Network Connectivity and Redundancy worldwide and no network “Steering” of IoT SIM cards.  OneSimCard Global IoT SIM cards are programmed to register on the IoT Roaming partner network offering the best signal strength. Whether the vehicles are traveling across town or across Europe, fleet managers can be assured of the best possible network coverage available by choosing the OneSimCard M2M Global IoT SIM card.",
          ]}
        />
        <FeatureSection
          description="OneSimCard M2M /IoT services also offers fleet management companies an advanced administrative account portal and IoT dashboard, along with an IoT platform which allows easy management thousands of IoT SIM cards.  In addition, OneSimCard M2M offer IoT industry leading flexibility in data plans and service pricing by evaluating each project and application on its own merit. Unlike some of its IoT competitors, OneSimCard does not have any monthly management fees."
          imageSrc={Fleet_managment}
          imageAlt="Fleet_managment"
          reverse={false}
          aos={{ type: "fade-up", delay: 200, duration: 1000 }}
          btnBgColor="#F3C500"
        />

        <ContentSection
          paragraphs={[
            "As an international global roaming IoT SIM card, OneSimCard M2M offers especially outstanding IoT service and pricing to fleets which are crossing international borders. With coverage in over 160 countries and network redundancy in all major countries, OneSimCard M2M’s international IoT roaming offering is industry leading.",
            "OneSimCard M2M also continues to support 2G IoT devices in the United States, Canada and throughout the world. Due to our hundreds of international roaming agreements, OneSimCard M2M is able to offer 2G IoT services across the globe on still operating 2G networks. This is in stark contrast to our competitors who often only have a single roaming partner in each country and therefore are unable to offer 2G IoT services if their single partner has already closed their 2G network.",
            "For all these numerous reasons, OneSimCard M2M is the chosen IoT services provider for numerous fleet management companies across the globe.",
          ]}
        />
      </div>
    </>
  );
}

export default IoTSolutionsFleet;

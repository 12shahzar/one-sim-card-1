import React from "react";
import SectionHeading from "../Components/Heading/SectionHeading";
import ContentSection from "../Section/ContentSection/ContentSection";
import FeatureSection from "../Components/FeatureComponent/FeatureSection";
import simCalculator from "../assets/images/sim_Managment.svg";
import { Link } from "react-router-dom";

function BusinessOppotunities() {
  return (
    <div className="max-w-7xl mx-auto py-16 font-sora px-2 md:px-6">
      <ContentSection
        title="IoT SIM card business opportunities for distributors and resellers"
        paragraphs={[
          "OneSimCard M2M has established itself as premium provider of IoT connectivity services in over 200+ countries. The OneSimCard IoT SIM card features network redundancy in most countries and does not “steer” towards the least expensive network, but instead always chooses the best local network available.  These key features allow OneSimCard M2M to offer much better coverage and service reliability worldwide.",
          "Companies in need of M2M / IoT connectivity have come to rely on the outstanding products and services provided by OneSimCard M2M. Given the strong demand for our premium M2M IoT SIM cards, we have created an Internet of Things business opportunity which allows our Distributors and Resellers to benefit from selling a premium IoT connectivity product.",
        ]}
      />
      <FeatureSection
        title="Distributor and Resellers Program"
        description="OneSimCard M2M Distributors and Resellers are M2M / IoT connectivity suppliers to corporate end users. They purchase M2M / IoT SIM cards (and corporate balance  if wanting to recharge customers' accounts directly) at wholesale prices and sell our OneSimCard M2M IoT SIM cards independently to end user companies in need of  M2M / IoT connectivity services. OneSimCard provides the web tools necessary to allow Distributors and Reseller to set up corporate accounts, assign IoT SIM cards to a corporate account and apply balance to IoT SIM cards within corporate IoT SIM card accounts."
        imageSrc={simCalculator}
        imageAlt="Distributor and Resellers Program"
        reverse={false}
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#455E86"
      />
      <ContentSection
        title="Revenue Opportunities"
        paragraphs={[
          "IoT SIM card margin - Distributors and Resellers have the ability to purchase OneSimCard IoT SIM cards at wholesale discounts and then sell the M2M IoT SIM cards to corporate users at full price.",
          "IoT corporate balance margin - Distributors and Resellers have the ability to purchase OneSimCard IoT balance at wholesale discounts and then sell the balance to corporate users at full value.",
          "Lifetime Residual Commissions - Distributor and Resellers are not obligated to purchase OneSimCard balance. Instead of purchasing balance, Distributors and Resellers may instruct their customers to make corporate balance recharges directly with OneSimCard. For Distributors and Resellers choosing this option, OneSimCard M2M offers lifetime residual commissions on all future balance purchases by their customers.",
          "Ready to begin receiving strong revenues with an uncapped earning potential? It's very easy to get started - just sign up below as a OneSimCard M2M / IoT Distributor and someone will contact you to discuss a possible partnership.",
        ]}
      />
      <Link
        to="/m2mDistributorRegistration"
        className="text-[#455E86] text-xl font-semibold cursor-pointer hover:underline m-5"
      >
        Sign up today to become a OneSimCard M2M / IoT Distributor
      </Link>
    </div>
  );
}

export default BusinessOppotunities;

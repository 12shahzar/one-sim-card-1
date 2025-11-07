import React from "react";
import worldMap from "../../assets/images/World_map.svg"; // replace with your map image path
import FeatureSection from "../../Components/FeatureComponent/FeatureSection";
import SectionHeading from "../../Components/Heading/SectionHeading";

function IoTSimSection() {
  return (
    <section
      data-aos="fade-down"
      className="max-w-screen-xl mx-auto py-14 font-sora px-4 md:px-0"
    >
      {/* Header Section */}
      <div className="text-left ">
        <SectionHeading title="IoT SIM Card" align="left" />
        <p className="text-[#08080C] mt-2 font-medium text-2xl ml-1">
          IoT SIM Card For Global Connectivity | Secure M2M & Prepaid IoT SIM
          Plans
        </p>
        <hr className="border-gray-300 my-6" />
      </div>

      {/* Description */}
      <p className="text-[#6B7280] font-regular text-base  leading-relaxed mb-12 pr-2 md:pr-72">
        With a focus on worldwide M2M roaming, network redundancy in most
        countries, secure connectivity and intelligent pricing by application,{" "}
        <span className="text-[#455E86] font-semibold">OneSimCard IoT</span>{" "}
        provides an outstanding value proposition and truly is the chosen
        alternative IoT SIM card service provider.
      </p>

      <FeatureSection
        title="Coverage"
        subtitle="Global"
        description="OneSimCard gives you the world in the palm of your hand providing global connectivity IoT SIM card solutions in over 200 countries worldwide."
        buttonText="Global IoT"
        imageSrc={worldMap}
        imageAlt="World Map"
        reverse={false}
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#455E86"
        btnHoverColor="#3b5072"
        btnTextColor="#ffffff"
      />
    </section>
  );
}

export default IoTSimSection;

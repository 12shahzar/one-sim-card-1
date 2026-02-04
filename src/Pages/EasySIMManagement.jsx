import React from "react";
import Common_Banner from "../Components/Banner/Common_Banner";
import FaqSection from "../Section/FaqSection/FaqSection";
import Devices from "../assets/images/Devices.png";
import FeaturesGrid from "../Components/FeaturesGrid/FeaturesGrid";
import featuresData from "../data/featuresData";

function EasySIMManagement() {
  return (
    <>
      <section
        data-aos="slide-up"
        className="font-sora md:min-h-96 mx-4 md:mx-6 my-2 py-16 px-2 md:px-6"
      >
        {/* Card Section */}
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:items-start ">
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col text-center md:text-left justify-center space-y-5">
            <p className="text-[#08080C] max-w-lg md:mx-0 font-sora font-thin text-3xl md:text-5xl">
              OSCAR IoT SIM card platform: Scalable, Simple & Secure
            </p>

            <p className="text-[#08080C] max-w-lg  md:mx-0 font-sora font-regular text-xl">
              Manage Unlimited Number of IoT SIM cards Under One Web Account
            </p>
            <p className="text-[#6B7280] max-w-lg  md:mx-0 font-sora font-regular text-base">
              OneSimCard IoT's proprietary, cloud-based OSCAR SIM Management
              platform makes it easy for companies to manage any number of IoT
              SIM cards. It's not enough to save on communications - IoT SIM card
              management has to be powerful & secure, yet simple.
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start bg-">
            <img src={Devices} alt="HassleFree" className="" />
          </div>
        </div>
      </section>
      <div className="mx-4 md:mx-6 pb-16" data-aos="fade-left">
        <FeaturesGrid
          title="OneSimCard OSCAR Platform Features"
          featuresData={featuresData}
        />
      </div>
    </>
  );
}

export default EasySIMManagement;

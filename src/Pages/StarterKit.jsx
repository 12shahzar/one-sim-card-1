import React from "react";
import SectionHeading from "../Components/Heading/SectionHeading";
import FeaturesGrid from "../Components/FeaturesGrid/FeaturesGrid";
import featuresData from "../data/starterkit";
import kitCard from "../assets/images/kitCard.svg";
import CustomButton from "../Components/CustomButton/CustomButton";

function StarterKit() {
  return (
    <div className="max-w-7xl mx-auto py-16 font-sora px-2 md:px-6">
      <div className="text-left ">
        <SectionHeading
          title="Buy IoT SIM cards for Seamless Global Connectivity"
          align="left"
        />
        <p className="text-[#08080C] mt-2 font-medium text-2xl ml-1">
          Get ready for the Internet of Things with the IoT SIM card from OneSimCard.
        </p>
        <hr className="border-gray-300 my-6" />
        <p className="text-[#6B7280] font-regular text-light  leading-relaxed mb-12 pr-2 md:pr-72">
          The OneSimCard M2M / IoT SIM card is a small electronic chip which inserts into a compatible device. It enables your remote device to transfer data on 2G, 3G, 4G LTE (including LTE-M and NB-Iot), or 5G networks in over 200 countries on over 350 carriers with no steering. Starter Kit coverage includes
          <span className="text-[#455E86] font-semibold">
            {" "}
            150 of the most popular destinations.
          </span>{" "}
        </p>
      </div>
      <div>
        <div className="" data-aos="fade-left">
          <FeaturesGrid
            title="International IoT SIM card for M2M features:"
            featuresData={featuresData}
            showButtons={false}
          />
        </div>
        <div className="text-left py-16 font-sora">
          <SectionHeading
            title="Order Your International M2M / IoT SIM cards:"
            align="left"
          />

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mt-10">
            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={kitCard}
                alt="5G IoT SIM card"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-3xl md:text-5xl font-thin text-[#08080C]">
                $24.95
              </h2>

              <h3 className="text-xl md:text-2xl font-medium text-[#08080C]">
                M2M / IoT SIM card Starter Kit
              </h3>

              <ul className="list-disc list-outside text-base text-[#6B7280] pl-5 space-y-2">
                <li>5 No Steering IoT SIM cards</li>
                <li>100MB Pooled data for 30 days</li>
                <li>
                  Coverage in 200+ countries on over 350 Networks (Starter Kit includes 150 countries)
                </li>
                <li>Web Account Management</li>
                <li>Free Dedicated USA Based Support</li>
                <li>Available for New Customers Only, limit 1 Starter Kit per Customer
                </li>
              </ul>

              <div className="mt-4">
                <CustomButton
                  text="Buy Now"
                  bgColor="#455E86"
                  hoverColor="#3b5072"
                  textColor="white"
                  to="/BuyNow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StarterKit;

import { useEffect, useState } from "react";
import { getKeyFeatures } from "../api/apiService";
import FaqSection from "../Section/FaqSection/FaqSection";
import FeatureSection from "../Components/FeatureComponent/FeatureSection";
import CustomButton from "../Components/CustomButton/CustomButton";
import Consumer_banner from "../assets/images/Consumer_banner.svg";
import SectionHeading from "../Components/Heading/SectionHeading";
import worldMap from "../assets/images/World_map.svg";
import network_redundancy from "../assets/images/network_redundancy.svg";
import simCalculator from "../assets/images/sim_Managment.svg";
import PopularApplications from "../Section/PopularApplications/PopularApplications";
import PopularPlans from "../Section/PopularPlans/PopularPlans";

function ConsumerIOT() {

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await getKeyFeatures();
        console.log("Key Features API:", data);
        setFeatures(data?.keyFeatures || []);
      } catch (err) {
        console.error("Failed to fetch key features", err);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <>
      <section
        data-aos="fade-up"
        className="md:min-h-96 bg-[#455E86] text-white rounded-4xl mx-2 md:mx-6 my-2 p-12 md:p-0  md:px-24 flex flex-col md:flex-row items-center justify-between"
      >
        {/* Left Content */}
        <div className="flex-1 text-center  md:text-left space-y-2">
          <h1 className="text-4xl md:text-6xl font-sora font-semibold ">
            <span className="text-white">Consumer Global IoT</span>{" "}
            <span className="bg-gradient-to-r from-white to-[#F4C600] bg-clip-text text-transparent">
              Connectivity Made Easy
            </span>
          </h1>

          <p className="font-sora text-xl font-medium text-white">
            Reliable Data & SMS Solutions in over 400 Countries
          </p>

          <div>
            <CustomButton text="Get Started" to="/SimPlans" />
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden flex-1 sm:flex justify-center md:justify-end mt-12 ">
          <img
            src={Consumer_banner}
            alt="Consumer Banner"
            className="w-full h-96"
          />
        </div>
      </section>
      <div
        data-aos="fade-right"
        className="max-w-screen-xl mx-auto pt-14 font-sora  px-2 md:px-6"
      >
        <SectionHeading title="Key Features" align="left" aos="fade-up" />
      </div>
      {features?.map((feature, index) => (
        <FeatureSection
          key={index}
          title={feature?.title}
          subtitle={feature?.subtitle}
          description={feature?.description}
          imageSrc={feature?.imageSrc}
          imageAlt={feature?.imageAlt}
          reverse={feature?.reverse}
          subtitleColor={feature?.subtitleColor}
          aos={feature?.aos}
          btnBgColor={feature?.btnBgColor}
        />
      ))}
      <PopularApplications />
      <PopularPlans />
      <FaqSection />
    </>
  );
}

export default ConsumerIOT;

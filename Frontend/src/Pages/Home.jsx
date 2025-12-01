import React, { useEffect } from "react";
import Banner from "../Components/Banner/Banner";
import IoTSimSection from "../Section/IoTSimSection/IoTSimSection";
import SimManagment from "../Section/SimManagment/SimManagment";
import SecurityLevel from "../Section/SecurityLevel/SecurityLevel";
import ConnectivitySection from "../Section/ConnectivitySection/ConnectivitySection";
import CompatableDevice from "../Section/CompatableDevice/CompatableDevice";
import FaqSection from "../Section/FaqSection/FaqSection";
import PricingByApplication from "../Section/PricingByApplication/PricingByApplication";
import BlogSection from "../Section/BlogSection/BlogSection";

const Home = () => {
  return (
    <>
      <Banner />
      <IoTSimSection />
      <SecurityLevel />
      <SimManagment />
      <ConnectivitySection />
      <CompatableDevice />
      <BlogSection />
      <FaqSection bgColor="#ffffff" />
      <PricingByApplication />
    </>
  );
};

export default Home;

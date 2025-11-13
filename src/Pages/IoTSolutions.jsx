import React from "react";
import FaqSection from "../Section/FaqSection/FaqSection";
import CustomButton from "../Components/CustomButton/CustomButton";
import IOT_Banner from "../assets/images/IOT_Banner.svg";
import ContentSection from "../Section/ContentSection/ContentSection";
import FeatureSection from "../Components/FeatureComponent/FeatureSection";
import worldMap from "../assets/images/World_map.svg";
import connectivity from "../assets/images/connectivity.svg";
import esim from "../assets/images/esim.svg";
import GSim from "../assets/images/GSim.svg";
import robust_security from "../assets/images/robust_security.svg";
import doc from "../assets/images/doc.svg";
import { Link } from "react-router-dom";

function IoTSolutions() {
  const partners = [
    { title: "Premier Partners" , link: "/Technology?section=Partners"},
    { title: "Compatible Software", link: "/Technology?section=Partners"  },
    { title: "Compatible Devices", link: "/Technology?section=Partners"  },
  ];
  const segments = [
    {
      title: "Fleet Management Solutions",
      link: "/IoTSolutions/FleetManagementSolutions",
    },
    { title: "Connected Vehicle", link: "/IoTSolutions/ConnectedVehicle" },
    { title: "Asset Tracking", link: "/IoTSolutions/AssetTracking" },
    { title: "Supply Chain Tracking and Tracing", link: "/IoTSolutions/SupplyChainTrackingAndTracing" },
    { title: "Digital Advertising Updates", link: "/IoTSolutions/DigitalAdvertisingUpdates" },
    { title: "Smart Home",link:"/IoTSolutions/SmartHome" },
    { title: "AgTech",link:"/IoTSolutions/AgTech" },
    { title: "EV Charging",link:"/IoTSolutions/EVCharging"  },
    { title: "Wearables",link:"/IoTSolutions/Wearables"  },
    { title: "Meter Monitoring", link: "/IoTSolutions/MeterMonitoring"  },
    { title: "Medical Monitoring",link:"/IoTSolutions/MedicalMonitoring" },
  ];

  return (
    <>
      <section
        data-aos="fade-up"
        className="md:min-h-96 bg-[#455E86] text-white rounded-4xl mx-2 md:mx-6 my-2 p-12 md:p-0  md:px-24 flex flex-col md:flex-row items-center justify-between"
      >
        {/* Left Content */}
        <div className="flex-1 text-center  md:text-left space-y-2">
          <h1 className="text-4xl md:text-6xl font-sora font-semibold ">
            <span className="text-white">OneSimCard M2M</span>{" "}
            <span className="bg-gradient-to-r from-white to-[#F4C600] bg-clip-text text-transparent">
              For IoT
            </span>
          </h1>

          <p className="font-sora text-xl font-medium text-white">
            Secure Communications In 160+ Countries
          </p>

          <div>
            <CustomButton text="Starter Kit Available" to="/StarterKit" />
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden flex-1 sm:flex justify-center md:justify-end mt-12 ">
          <img
            src={IOT_Banner}
            alt="OneSimCard M2M Banner"
            className="w-full h-96"
          />
        </div>
      </section>

      <ContentSection
        title="IoT SIM Card"
        paragraphs={[
          "OneSimCard IoT is a leading provider of global IoT SIM cards that play a pivotal role in advancing any solutions you can dream of. We work with businesses and organizations of all types, from Start-ups to Fortune 500 companies and Public Sector agencies. These are both end-users as well as device manufacturers. Here’s how OneSimCard IoT can help:",
        ]}
      />
      <FeatureSection
        title="Coverage"
        subtitle="Global"
        description="OneSimCard IoT offers extensive global coverage in over 200 countries and territories, with over 400 networks, ensuring that devices can stay connected no matter where they are located. This is particularly beneficial for smart solutions that rely on consistent connectivity across various regions and devices."
        imageSrc={worldMap}
        imageAlt="World Map"
        reverse={false}
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#455E86"
      />

      <FeatureSection
        title="Connectivity"
        subtitle="Reliable "
        imageSrc={connectivity}
        description="Because we offer “No Steering,” Multi-IMSI, Multi-Carrier IoT SIM cards, OneSimCard IoT provides reliable and secure connectivity, which is essential for the critical systems used in IoT Solutions. The reliability of these connections ensures that data can be transmitted and received without interruptions, maintaining the efficiency and effectiveness of smart solutions."
        reverse={true}
        subtitleColor="#F3C500"
        imageAlt="Connectivity"
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#F3C500"
      />

      <FeatureSection
        title="Plans"
        subtitle="Customizable "
        description="OneSimCard IoT offers customizable plans (both Pooled and Pay-As-You-Go plans) tailored to the specific needs of IoT applications. This flexibility allows us to design the most suitable data plans for each client, optimizing costs while ensuring robust connectivity for all devices."
        imageSrc={esim}
        imageAlt="Customizable "
        reverse={false}
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#455E86"
      />
      <div
        data-aos="fade-left"
        className="min-h-80 bg-[#455E86] rounded-4xl m-6 flex items-center justify-center p-4 md:p-8"
      >
        <div className="max-w-7xl w-full mx-auto ">
          {/* Title */}
          <h2 className="text-3xl md:text-5xl text-white mb-8 font-thin">
            Partners
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {partners.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="cursor-pointer border border-[#D2D2D2] text-white min-w-2xs md:min-w-sm text-center px-6 py-2 md:px-8 md:py-3 rounded-full font-medium hover:bg-[#F4C600] hover:text-[#08080C] transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FeatureSection
        title="Integration"
        subtitle="Easy "
        imageSrc={GSim}
        description="With OneSimCard IoT, integration into existing IoT infrastructures is straightforward. The IoT SIM cards are designed to be compatible with a wide range of devices and networks, simplifying the deployment of new smart solutions."
        reverse={true}
        subtitleColor="#F3C500"
        imageAlt="Integration"
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#F3C500"
      />

      <FeatureSection
        title="Security"
        subtitle="Robust "
        description="Security is a top priority for IoT deployments, especially where data integrity and privacy are crucial. OneSimCard IoT provides robust security features to protect data transmission and prevent unauthorized access. We offer Private APN's, IPSec VPN, & Private IP's to ensure the highest level of security for our clients."
        imageSrc={robust_security}
        imageAlt="robust_security"
        reverse={false}
        aos={{ type: "fade-up", delay: 200, duration: 1000 }}
        btnBgColor="#455E86"
      />
      <ContentSection
        paragraphs={[
          "IoT SIM cards are instrumental in the development and operation of any IoT solutions, offering enhanced connectivity, real-time data collection, scalability, and cost efficiency. OneSimCard IoT, with its global coverage, reliable connectivity, customizable plans, easy integration, and robust security, is well-positioned to our clients and their solutions in the journey towards becoming smarter and more efficient.",
          "The OneSimCard IoT Global IoT SIM Card and the OneSimCard IoT platform were developed for many key IoT industry segments where OneSimCard IoT offers advanced IoT solutions and expertise.",
        ]}
      />
      <div className="max-w-7xl mx-auto my-8  px-2 md:px-6" data-aos="fade-right">
        <p className="text-[#455E86] text-xl font-semibold">
          These segments include:
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          {segments.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="cursor-pointer border border-[#D2D2D2] text-[#6B7280] text-center px-6 py-2 md:px-8 md:py-3 rounded-full font-medium hover:bg-[#F4C600] hover:text-[#08080C] transition-all duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <Link
          target="blank"
          to={"https://iot.onesimcard.com/doc/IoTeBook.pdf"}
          className="flex gap-5 my-16"
        >
          <img src={doc} />
          <p className="text-[#455E86] text-xl font-semibold">
            An Introduction to the Role IoT SIM Cards Play in Connecting
            “Things”
          </p>
        </Link>
      </div>
      <FaqSection />
    </>
  );
}

export default IoTSolutions;

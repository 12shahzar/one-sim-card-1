import React from "react";
import FeatureSection from "../Components/FeatureComponent/FeatureSection";
import CustomButton from "../Components/CustomButton/CustomButton";
import DataRates1 from "../assets/images/DataRates1.svg";
import DataRates2 from "../assets/images/DataRates2.svg";
import ContentSection from "../Section/ContentSection/ContentSection";

function Rates() {
  return (
    <div className="max-w-7xl mx-auto pb-14 font-sora px-2 md:px-6">
      <ContentSection
        title="Internet of Things IoT SIM card with Flexible M2M Data Rates"
        paragraphs={[
          "Because every situation is unique, we offer many extremely competitive pricing plans to fit any budget, & we customize our plans based on each client’s specific needs. Our pricing ranges depending on certain factors such as countries included, volume of active SIM cards, and volume of data needed. Our pricing plans fall into 2 general categories: Pay-as-you-go & Pooled with offer rates as low as $0.005/MB in both categories",
        ]}
      />
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
        className="max-w-screen-xl mx-auto px-2 md:px-6 py-4 font-sora"
      >
        <div
          className={`py-6 md:py-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8`}
        >
          {/* IMAGE SIDE */}
          <div data-aos="fade-right" className="">
            <img
              src={DataRates1}
              alt="Sample Alt"
              className="object-contain w-full h-full"
            />
          </div>

          {/* TEXT SIDE */}
          <div
            data-aos="fade-left"
            className="w-full md:w-1/2 flex flex-col text-center md:text-left justify-center pr-0 "
          >
            <p className="text-[#6B7280] m-4 mb-6 md:mx-0">
              This category of plans is perfect for clients who are uncertain of
              their data consumption needs, or where individual IoT devices
              either consume a vastly different amount of data per month, or
              their IoT SIM card deployment covers many different countries
              where rates in each country can vary. Each IoT SIM card is funded from an
              existing balance on the account.
            </p>
            <p className="text-[#6B7280] m-4 mb-6 md:mx-0">
              The IoT SIM card can either be set up as Pay-As-You-Go per MB or with a set
              plan of any size per IoT SIM card. Each IoT SIM card can have a different plan
              giving you a tremendous amount of flexibility in your deployment.
            </p>
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
        className="max-w-screen-xl mx-auto px-2 md:px-6 py-4 font-sora"
      >
        <div
          className={`py-6 md:py-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8`}
        >
          {/* TEXT SIDE */}
          <div
            data-aos="fade-left"
            className="w-full md:w-1/2 flex flex-col text-center md:text-left justify-center pr-0 "
          >
            <p className="text-[#6B7280] m-4 mb-6 md:mx-0">
              This category of plans is ideal for clients who have a general
              idea of their average data consumption needs and all of their IoT
              devices tend to require a similar amount of cellular data traffic
              and the IoT SIM cards operate in similarly priced countries. Data in
              this category of plans pools across all active devices on the
              single account. All IoT SIM cards on a particular account must have the
              same exact plan (e.g. same cost, same data plan, and same included
              countries). Each active IoT SIM card contributes an equal amount of data
              into the pool. Plan sizes can be of ANY size per IoT SIM card– simply tell
              us what you need and we will design a custom plan for your
              particular project.{" "}
            </p>
          </div>
          {/* IMAGE SIDE */}
          <div data-aos="fade-right" className="">
            <img
              src={DataRates2}
              alt="Sample Alt"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </section>

      <div className="text-center">
        <CustomButton
          text="Contact Sales for your Custom Quote"
          className="w-fit "
          bgColor="#455E86"
          hoverColor="#3b5072"
          textColor="white"
          to="/CustomQuote"
        />
      </div>
    </div>
  );
}

export default Rates;

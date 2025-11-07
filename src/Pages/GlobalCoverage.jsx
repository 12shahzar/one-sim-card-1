import Common_Banner from "../Components/Banner/Common_Banner";
import ContentSection from "../Section/ContentSection/ContentSection";
import FaqSection from "../Section/FaqSection/FaqSection";
import CoverageSection from "../Section/CoverageSection/CoverageSection";

const GlobalCoverage = () => {
  return (
    <>
      <Common_Banner
        titleFirst="Why OneSim"
        titleLast="Card"
        breadcrumb="IoT SIM Card Coverage"
      />
      <ContentSection
        title="IoT SIM Card Coverage"
        paragraphs={[
          "OneSimCard IoT is proud to partner with over 450 Networks in 180+ countries & territories. Many countries feature multiple major network partners. For example, in the USA we offer service on AT&T, T-Mobile and Verizon, & Canada we operate on Rogers, Bell and Telus.",
          "Because our no steering, multi-IMSI SIM card operates on various networks, we offer industry leading coverage and redundancy in most of our service area.",
          "With our Pooled Data Plan, we tailor our plans to your specific coverage needs. This customized approach saves you money by providing exactly what you need with nothing you don’t. Every country can potentially have different costs. By including only those countries you need, we can remove higher cost countries from your plan and pass the savings to you.",
        ]}
      />
      <div className="py-16"
            data-aos="fade-left"

      >
        <CoverageSection />
      </div>

      <FaqSection />
    </>
  );
};

export default GlobalCoverage;

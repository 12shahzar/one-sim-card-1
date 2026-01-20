import React from "react";
import { useParams } from "react-router-dom";
import IoTSolutionsData from "../data/iotSolutionsData";
import Layout from "../Layout/Layout";
import ContentSection from "../Section/ContentSection/ContentSection";
import FeatureSection from "../Components/FeatureComponent/FeatureSection";

const IoTSolutionDetails = () => {
  const { slug } = useParams();
  const data = IoTSolutionsData[slug];

  if (!data) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Solution not found.
      </div>
    );
  }

  return (
    <Layout banner={data.banner}>
      <div className="pb-16 ">
        {/* Main title / paragraphs */}
        {data.title && data.paragraphs && (
          <ContentSection title={data.title} paragraphs={data.paragraphs} />
        )}

        {/* Features */}
        {data.features?.map((feature, index) => (
          <FeatureSection
            key={index}
            description={feature.description}
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
            reverse={feature.reverse}
            title={feature.title || ""}
            aos={{ type: "fade-up", delay: 200, duration: 1000 }}
            btnBgColor={feature.btnBgColor || "#455E86"}
            
               
          />
        ))}

        <ContentSection paragraphs={data.extraContent} />
      </div>
    </Layout>
  );
};

export default IoTSolutionDetails;

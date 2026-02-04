import React from "react";
import SectionHeading from "../../Components/Heading/SectionHeading";
import FeatureSection from "../../Components/FeatureComponent/FeatureSection";

function Details({ details }) {
  // Since you only have one detail object, we can safely use the first item
  const detail = details?.[0];

  if (!detail) return null;

  return (
    <div className="font-sora">
      {/* Section Heading */}
      <SectionHeading title={detail.heading} align="left" />

      {/* Main description */}
      {Array.isArray(detail.description) && detail.description.map((desc, idx) => (
        <p key={idx} className="my-2 text-base text-[#6B7280]">
          {desc}
        </p>
      ))}

      {/* Image */}
      {detail.image && (
        <div className="bg-white rounded-4xl p-5 md:p-14 shadow-[0_8px_90px_rgba(0,0,0,0.04)] my-6">
          <img src={detail.image} alt={detail.heading} className="w-full" />
        </div>
      )}

      {/* Feature Section (conditionally rendered) */}
      {detail.featureContent && detail.featureContent !== false && (
        <FeatureSection
          description={detail.featureContent.content}
          imageSrc={detail.featureContent.image}
          descriptionTextSize="text-base"
          btnBgColor="#F9DA2F"
        />
      )}

      {/* Bottom description */}
      {Array.isArray(detail.bottomDescription) && detail.bottomDescription.map((desc, idx) => (
        <p key={idx} className="my-5 text-base text-[#6B7280]">
          {desc}
        </p>
      ))}

      {/* Contact info (conditionally rendered) */}
      {detail.contact && (
        <p className="font-semibold text-base text-[#455E86]">
          To learn more about OneSimCard eSIM offerings please email:{" "}
          <span className="underline">sales@onesimcard.com</span>
        </p>
      )}
    </div>
  );
}

export default Details;

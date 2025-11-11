import React from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function FeaturesGrid({ title, featuresData, showButtons = true }) {
  return (
    <section className="max-w-7xl mx-auto font-sora">
      {/* Title */}
      {title && (
        <p className="text-xl font-medium text-[#08080C] mb-10">{title}</p>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
        {featuresData.map((feature, index) => (
          <div key={index} className="flex flex-col items-start gap-1">
            {feature.icon && (
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 flex-shrink-0"
              />
            )}
            <div className="pr-2 md:pr-24">
              <p className="text-[#000000] text-lg font-regular">
                {feature.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons (conditionally rendered) */}
      {showButtons && (
        <div className="flex flex-wrap items-center gap-4 mt-12">
          <CustomButton
            text="View All Features"
            bgColor="#455E86"
            hoverColor="#3b5072"
            textColor="white"
            to="/OSCARIoTSIMCardManagementPortal"
          />
          <CustomButton text="Request A Quote" to='/CustomQuote' />
        </div>
      )}
    </section>
  );
}

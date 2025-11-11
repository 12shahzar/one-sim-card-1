import React from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";

const FeatureSection = ({
  // TEXT CONTENT
  title,
  subtitle,
  description,
  buttonText,
  descriptionTextSize = "text-lg", // NEW PROP

  // IMAGE CONTENT
  imageSrc,
  imageAlt,

  imageMaxWidth = "28rem",
  imageMaxHeight = "24rem",

  // CONFIG / LAYOUT
  reverse = false, // false = image left, true = image right
  bgColor = "white",
  rounded = "rounded-2xl",

  // ANIMATION
  aos = {
    type: "fade-up",
    delay: 0,
    duration: 800,
  },

  // BUTTON COLORS
  btnBgColor = "#455E86",
  btnHoverColor = "#3b5072",
  btnTextColor = "white",
  subtitleColor = "#455E86",
  btnRedirect
}) => {
  return (
    <section
      data-aos={aos?.type}
      data-aos-delay={aos?.delay}
      data-aos-duration={aos?.duration}
      className="max-w-screen-xl mx-auto py-4 font-sora"
    >
      <div
        className={`bg-${bgColor} py-6 md:py-8 ${rounded} flex flex-col md:flex-row items-center justify-between gap-8 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* IMAGE SIDE */}
        <div
          data-aos={reverse ? "fade-left" : "fade-right"}
          className="w-[20rem] h-[16rem] sm:w-[22rem] sm:h-[18rem] md:w-[32rem] md:h-[18rem] 
             flex items-center justify-center bg-white rounded-4xl p-6"
          style={{
            boxShadow: `0px 1px 5px ${btnBgColor}20`,
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-contain w-full h-full"
          />
        </div>

        {/* TEXT SIDE */}
        <div
          data-aos={reverse ? "fade-right" : "fade-left"}
          className="w-full md:w-1/2 flex flex-col text-center md:text-left justify-center pr-0 md:pr-36"
        >
          {subtitle && (
            <span
              className="text-lg font-medium uppercase"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="text-5xl font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <p className={`${descriptionTextSize} text-[#6B7280] m-4 mb-6 md:mx-0`}>
              {description}
            </p>
          )}

          {buttonText && (
            <CustomButton
              text={buttonText}
              bgColor={btnBgColor}
              hoverColor={btnHoverColor}
              textColor={btnTextColor}
              to={btnRedirect || '/'}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/bg_banner.png";

const Common_Banner = ({ titleFirst, titleLast, breadcrumb = [] }) => {
  return (
    <div
      className="md:min-h-72 font-sora bg-[#455E86] text-white rounded-4xl mx-2 md:mx-6 my-2 p-12 md:p-0 md:px-24 flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-aos="fade-up"
    >
      <div className="text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-semibold">
          <span className="text-white">{titleFirst}</span>
          <span className="bg-gradient-to-r from-white to-[#F4C600] bg-clip-text text-transparent">
            {titleLast}
          </span>
        </h1>

        {/* Breadcrumb */}
        <div className="text-sm mt-2 font-medium md:text-lg flex justify-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-[#F4C600]">
            Home
          </Link>
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <span>/</span>
              {index === breadcrumb.length - 1 ? (
                <span className="text-[#F4C600]">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[#F4C600] transition"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Common_Banner;

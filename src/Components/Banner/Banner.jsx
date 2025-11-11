import React from "react";
import bannerImage from "../../assets/images/banner_img.svg";
import CustomButton from "../CustomButton/CustomButton";

function Banner() {
  return (
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
          Secure Communications In 200+ Countries
        </p>

        <p className="md:text-xl font-sora font-medium text-white bg-gradient-to-r from-[#455E86] to-[#63A8ED] pr-8 py-2 my-4 rounded-full inline-block">
          M2M / IoT SIM Card Starter Kit
        </p>

        <div>
          <CustomButton text="Get Started" to="/SimPlans" />
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden flex-1 sm:flex justify-center md:justify-end mt-12 ">
        <img
          src={bannerImage}
          alt="OneSimCard M2M Banner"
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

export default Banner;

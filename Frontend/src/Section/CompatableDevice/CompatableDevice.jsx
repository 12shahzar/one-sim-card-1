import React from "react";
import HassleFree from "../../assets/images/hassle_platform.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";

function CompatableDevice() {
  return (
    <section
      data-aos="slide-up"
      className="font-sora md:min-h-96 bg-[#F5F5F5] text-white rounded-4xl mx-4 md:mx-6 my-2 py-16"
    >
      {/* Card Section */}
      <div className="max-w-screen-xl mx-auto  px-6  p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start bg-">
          <img src={HassleFree} alt="HassleFree" className="" />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col text-center md:text-left justify-center">
          <p className="text-[#6B7280] my-6 max-w-md mx-auto md:mx-0 font-sora font-thin text-3xl md:text-5xl">
            Hassle-free Deployment; Compatible with 1000s of devices and
            platforms
          </p>

          <p className="text-[#08080C] mt-4 mb-6 max-w-md mx-auto md:mx-0 font-sora font-medium text-xl">
            Compatable Devices & Software
          </p>

          <CustomButton text="View All" to="/Technology?section=Partners"/>
        </div>
      </div>
    </section>
  );
}

export default CompatableDevice;

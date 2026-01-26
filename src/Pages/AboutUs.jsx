import React from "react";
import ContentSection from "../Section/ContentSection/ContentSection";
import aboutImg from "../assets/images/about.svg";
import Testimonial from "../Components/Testimonial/Testimonial";

function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto py-16 font-sora px-2 md:px-6">
      <ContentSection
        title="About Us"
        paragraphs={[
          "OneSimCard® is a division of Belmont Telecom, Inc., a licensed U.S. interexchange carrier (IXC) providing telecommunications services since 1994, celebrating over 30 years in telecoms. We strive to make communication as efficient and inexpensive as possible for you, whether you're using data, texting or calling across town, across the country or across the globe.",
          "We provide you with the best, least expensive, and easiest to use international cell phone service. Whether you are an occasional international traveler wanting to make sure you have a phone in case of an emergency, or a frequent corporate jet setter who needs to stay in touch with your clients at all times, we will have the best solution for you. We offer the opportunity to stay connected in over 200 countries while avoiding your regular mobile carrier's high international roaming charges",
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
              src={aboutImg}
              alt="Sample Alt"
              className="object-contain w-full h-full"
            />
          </div>
          {/* TEXT SIDE */}
          <div
            data-aos="fade-left"
            className="w-full md:w-1/2 flex flex-col text-center md:text-left justify-center pr-0 "
          >
            <h3 className="text-5xl font-medium text-gray-900">
              Business Opportunities with OneSimCard
            </h3>

            <p className="text-[#6B7280] my-6 ">
              Our international IoT SIM cards and international cell phones are in
              high demand, that is why we have set up{" "}
              <span className="text-[#4A6590] font-semibold">
                two distinct partnering opportunities{" "}
              </span>{" "}
              which will allow our partners to reap the benefits of lifetime
              commissions simply by helping us introduce and distribute
              OneSimCard products around the world.
            </p>
          </div>
        </div>
      </section>
      <Testimonial />
    </div>
  );
}

export default AboutUs;

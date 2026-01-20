import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// styles
import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel } from "swiper/modules";

// your testimonial data (or import from JSON file)
import testimonials from "../../data/testimonials.json";

function Testimonial() {
  return (
    <div className="w-full h-[550px] flex">
      <div className="flex-1 h-full">
        <Swiper
          direction="vertical"
          slidesPerView={2}
          spaceBetween={30}
          mousewheel={true}
          modules={[Mousewheel]}
          className="h-full !pb-10"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div className="bg-white rounded-4xl p-4 md:p-8 border border-gray-200 h-full">
                
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F3F3F3] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#455E86]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-[#08080B] text-xl md:text-2xl font-medium">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  </div>
                </div>

                {/* Body */}
                <p className="text-[#6B7280] mt-4 leading-relaxed text-base md:text-lg font-regular">
                  {item.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonial;

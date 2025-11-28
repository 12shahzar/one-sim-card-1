import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import SectionHeading from "../../Components/Heading/SectionHeading";
import faqData from "../../data/Faq.json";

const { categories, faqs } = faqData;

export default function FaqSection({ bgColor = "#F5F5F5", searchBar = false }) {
  const [activeCategory, setActiveCategory] = useState("General Service");
  const [openIndex, setOpenIndex] = useState(0); // first question open by default

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  

  return (
    <section
      className="py-16 md:py-14 font-sora rounded-4xl mx-2 md:mx-6  px-2 md:px-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header */}

        <SectionHeading title="Frequently Asked Questions" />
        <p className="text-[#08080C] text-center mt-2 font-medium">
          {" "}
          We are here to help you get answers to your questions about OneSimCard
          phones and services.{" "}
        </p>

        {/* FAQ Layout */}
        <div className="mt-12 flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="md:w-1/3 w-full flex justify-center md:justify-start">
            <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-4xl p-2 md:p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(0); // always open first question when switching category
                  }}
                  className={`flex items-center w-full py-3 px-4 rounded-lg transition-all text-lg sm:text-2xl font-medium cursor-pointer
                       ${
                         activeCategory === cat
                           ? "text-[#455E86] "
                           : "text-[#08080C] "
                       }
                  `}
                >
                  {activeCategory === cat && (
                    <ChevronRight className="mr-2 h-5 w-5 text-[#455E86]" />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right FAQ Content */}
          <div className="md:w-2/3 w-full ">
            {searchBar && (
              <div
                className="bg-[#455E86] p-8 rounded-4xl 
                      flex flex-col md:flex-row md:items-center 
                      gap-6 md:gap-10 md:mb-6"
              >
                {/* Left Text */}
                <div className="text-white text-xl font-normal leading-tight">
                  Search OneSimCard <br /> Support Pages:
                </div>

                {/* Search + Button Container */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:flex-1">
                  {/* Rounded Search Input */}
                  <div className="relative w-full">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={22}
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full bg-white rounded-full py-3 pl-12 pr-4 
                      outline-none text-gray-700"
                    />
                  </div>

                  {/* Yellow Button */}
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 
                               px-10 py-3 rounded-full font-medium 
                               whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
            {faqs[activeCategory]?.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="transition-all">
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center gap-3 px-0 md:px-5 py-3 text-left"
                  >
                    {/* Toggle Icon (Left) */}
                    <ChevronRight
                      className={`h-7 w-7 rounded-full flex-shrink-0 transition-transform text-white cursor-pointer ${
                        isOpen
                          ? "rotate-90 bg-[#F4C600] p-1"
                          : "bg-[#455E86] p-1"
                      }`}
                    />
                    {/* Question Text */}
                    <span
                      className={`text-base sm:text-lg md:text-xl font-medium ${
                        isOpen ? "text-[#455E86] " : "text-[#08080C]"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </button>

                  {/* Answer Text */}
                  {isOpen && (
                    <div className="px-12 pb-5 text-[#6B7280] text-lg sm:text-base md:text-lg font-regular">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

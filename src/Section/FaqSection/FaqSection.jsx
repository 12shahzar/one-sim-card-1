import { useState } from "react";
import { ChevronRight } from "lucide-react";
import SectionHeading from "../../Components/Heading/SectionHeading";
import faqData from "../../data/Faq.json";


const { categories, faqs } = faqData;


export default function FaqSection({ bgColor = "#F5F5F5" }) {
  const [activeCategory, setActiveCategory] = useState("General Service");
  const [openIndex, setOpenIndex] = useState(0); // first question open by default

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section
      className="py-16 md:py-14 font-sora rounded-4xl mx-4 md:mx-6"
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
            <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-4xl p-4 shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
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
          <div className="md:w-2/3 w-full space-y-1">
            {faqs[activeCategory]?.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="transition-all">
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left"
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

import React from "react";
import euFlag from "../../assets/images/europe.svg"; // replace with your actual image paths
import usaCanadaFlag from "../../assets/images/canada.svg";
import usaFlag from "../../assets/images/USA.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";

const plans = [
  {
    title: "EU Plan",
    img: euFlag,
    size: "1200MB",
    price: "$8.00 Annually",
    color: "bg-[#2E4A6F]", // navy blue
    country: "Austria",
  },
  {
    title: "USA/Canada Plan",
    img: usaCanadaFlag,
    size: "1200MB",
    price: "$13.50 Annually",
    color: "bg-[#FFD700]", // yellow
    country: "Canada",
  },
  {
    title: "USA Plan",
    img: usaFlag,
    size: "1200MB",
    price: "$10.41 Annually",
    color: "bg-[#2E4A6F]",
    country: "USA",
  },
];

const PopularPlans = () => {
  return (
    <section className="w-full mb-16 text-center font-sora ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4  text-center sm:text-left px-2 md:px-6">
          <h2 className="text-3xl sm:text-5xl font-thin text-[#08080C]  ">
            Most Popular Plans
          </h2>

          <CustomButton
            text="View All Plans"
            bgColor="#455E86"
            hoverColor="#3b5072"
            textColor="white"
            to="/SimPlans"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-36 justify-items-center  px-2 md:px-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 rounded-2xl relative"
            >
              <div className="relative flex flex-col items-center">
                <div className="w-56 h-56 rounded-full bg-white flex items-center justify-center shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
                  <img src={plan.img} alt={plan.title} className="w-36 h-36" />
                </div>

                <div
                  className={`${plan.color} min-w-3xs text-white py-2 px-4 text-lg font-medium  absolute bottom-[-5px] rotate-[7deg]`}
                >
                  {plan.title}
                </div>
              </div>
              <div className="my-12 text-[#08080C]">
                <p className="font-medium text-lg">{plan.size}</p>
                <p className="font-medium text-lg">{plan.price}</p>
              </div>

              <CustomButton
                text="Buy Now"
                bgColor="#6B7280"
                hoverColor="#455E86"
                textColor="white"
                to={`/SimPlans?country=${plan.country}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPlans;

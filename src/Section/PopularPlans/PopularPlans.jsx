import React, { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { fetchPricingPlans } from "../../api/pricingPlansApi";

const PopularPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchPricingPlans();
        setPlans(data);
      } catch (error) {
        console.error("Failed to load pricing plans", error);
      }
    };
    loadPlans();
  }, []);

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
              key={plan.id || index}
              className="flex flex-col items-center p-8 rounded-2xl relative"
            >
              <div className="relative flex flex-col items-center">
                <div className="w-56 h-56 rounded-full bg-white flex items-center justify-center shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
                  <img src={plan.image_url} alt={plan.title} className="w-36 h-36" />
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

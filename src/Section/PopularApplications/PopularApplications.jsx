import React from "react";

const popularApps = [
  {
    title: "Remote Cameras",
    description: "Connect your remote cameras virtually anywhere!",
    image: "./images/camera.svg", // replace with your image path
  },
  {
    title: "GPS Tracking",
    description: "Track your vehicles, luggage, just about anything with a GPS device.",
    image: "./images/Gps.svg",
  },
  {
    title: "Wearables",
    description: "Seamless connectivity for smart devices.",
    image: "./images/watch.svg",
  },
];

const PopularApplications = () => {
  return (
    <section className="relative py-20 bg-white mt-24">
      {/* Background slant */}
      <div className="absolute top-12  md:top-20 left-0 w-full h-32 md:h-64 bg-[#455E86] -skew-y-6 transform origin-top-left"></div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-5xl font-thin text-white mb-24">
          Popular Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-36 px-2">
          {popularApps.map((app, index) => (
            <div
              key={index}
              className="md:max-w-xs bg-white rounded-4xl p-2 md:p-8 shadow-[0_8px_90px_rgba(0,0,0,0.04)] flex flex-col justify-center items-center"
            >
              <img
                src={app.image}
                alt={app.title}
                className="w-40 h-40 mb-4 object-contain"
              />     
              <h3 className="font-medium text-2xl mb-2">{app.title}</h3>
              <p className="text-[#6B7280] font-regular text-base">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularApplications;

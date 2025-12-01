// components/BlogCard.jsx
import { ArrowUpRight } from "lucide-react";

export default function BlogCard({ image, author, date, title }) {
  return (
    <div className="bg-[#FAFAFA] font-sora rounded-4xl  p-4  transition-all duration-300 cursor-pointer">
      {/* Image Section */}
      <div className="relative w-full h-56 sm:h-60 ">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover rounded-4xl" />
        ) : (
          <div className="w-full h-full bg-[url('/placeholder-image.png')] bg-center bg-cover opacity-20 rounded-4xl" />
        )}
        <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md">
          <ArrowUpRight className="w-4 h-4 text-[#455E86]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-lg text-gray-500 font-medium mb-4">
          <span className="text-[#08080C] font-semibold">{author}</span>{" "}
          <span className="tetx-[#6B7280]">- {date}</span>
        </div>
        <p className="text-[#08080C] text-xl font-regular leading-relaxed">
          {title}
        </p>
      </div>
    </div>
  );
}

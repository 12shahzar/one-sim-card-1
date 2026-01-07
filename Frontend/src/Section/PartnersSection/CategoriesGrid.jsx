export default function CategoriesGrid({ categories, onLearnMore }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-5">
      {categories?.map((category, idx) => (
        <div
          key={idx}
          className="transition-all duration-300 hover:transform hover:scale-105"
          style={{
            animation: `fadeInScale 0.5s ease-out ${idx * 0.1}s both`,
          }}
        >
          {category.image && (
            <img
              src={category.image}
              alt={category.label}
              className="w-16 h-16 mb-4 transition-transform duration-300 hover:scale-110"
            />
          )}
          <div className="pr-2 md:pr-24">
            <p className="text-[#000000] text-lg font-regular">
              {category.label}
            </p>
            <p className="text-[#6B7280] text-sm">{category.description}</p>
            {category.learnmore && (
              <p
                className="text-[#455E86] font-semibold text-sm cursor-pointer transition-colors duration-200 hover:text-[#3b5072]"
                onClick={() => onLearnMore(category.id)}
              >
                LEARN MORE
              </p>
            )}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

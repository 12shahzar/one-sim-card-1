export default function CategoriesGrid({ categories, onLearnMore }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-5">
      {categories?.map((category, idx) => (
        <div key={idx}>
          {category.image && (
            <img
              src={category.image}
              alt={category.label}
              className="w-16 h-16 mb-4"
            />
          )}
          <div className="pr-2 md:pr-24">
            <p className="text-[#000000] text-lg font-regular">
              {category.label}
            </p>
            <p className="text-[#6B7280] text-sm">{category.description}</p>
            {category.learnmore && (
              <p
                className="text-[#455E86] font-semibold text-sm cursor-pointer"
                onClick={() => onLearnMore(category.id)}
              >
                LEARN MORE
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

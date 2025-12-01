import React from "react";

function SectionHeading({
  title,
  subtitle,
  color = "#08080C",
  align = "center",
  showBreak = false,
  aos = "",
  className = "",
}) {
  const textAlign =
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div
      data-aos={aos}
      className={`w-full ${textAlign} ${className}`}
      style={{ color }}
    >
      {subtitle && (
        <p className="text-base md:text-lg font-medium mb-2" style={{ color }}>
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl md:text-6xl font-thin leading-tight">
        {showBreak ? (
          <>
            {title.split("<br/>")[0]}
            <br className="hidden md:block" />
            {title.split("<br/>")[1]}
          </>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}

export default SectionHeading;

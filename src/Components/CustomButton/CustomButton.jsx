export default function CustomButton({
  text = "Custom IoT Quote",
  bgColor = "#F3C500",
  hoverColor = "#e2b900",
  textColor = "black",
  onClick = () => {},
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`self-center md:self-start inline-flex items-center justify-center 
        font-medium text-sm px-10 py-4 rounded-full transition w-3xs cursor-pointer 
        ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    >
      {text}
    </button>
  );
}

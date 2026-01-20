import { useNavigate } from "react-router-dom";

export default function CustomButton({
  text = "Custom IoT Quote",
  bgColor = "#F3C500",
  hoverColor = "#e2b900",
  textColor = "black",
  to = "", // optional: pass a route path here
  onClick, // optional: custom function
  className = "",
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {  
    if (onClick) {
      onClick(e); // call custom handler
    } else if (to) {
      navigate(to); // navigate if route provided
    }
  };

  return (
    <button
      onClick={handleClick}
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

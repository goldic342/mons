const TextButton = ({ children, color, onClick, className, ...props }) => {
  return (
    <button
      className={`uppercase cursor-pointer text-${color} duration-300 transition-opacity hover:opacity-80 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;

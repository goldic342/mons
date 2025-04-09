import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SlideReveal = ({
  children,
  className = "",
  duration = 0.8,
  ...props
}) => {
  return (
    <motion.div
      viewport={{ once: true }}
      transition={{ duration, ease: "easeOut" }}
      variants={{
        hidden: { height: 0, opacity: 0 },
        show: { height: "auto", opacity: 1 },
      }}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideReveal;

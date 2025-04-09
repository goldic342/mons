import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BASE_DURATION } from "../uiConfig";

const SlidingBox = ({
  children,
  duration = BASE_DURATION,
  className,
  once = false,
  offset = 50,
  reverse = false,
  ...props
}) => {
  const reverseOffset = (offset) => (reverse ? -1 : 1 * offset);

  return (
    <motion.div
      className={className}
      viewport={{ once }}
      transition={{ duration, ease: "easeOut" }}
      variants={{
        show: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: reverseOffset(-offset) },
        exit: { opacity: 0, y: reverseOffset(offset) },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlidingBox;

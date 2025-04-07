import { motion, useInView } from "framer-motion";
import { BASE_DURATION } from "../uiConfig";
import { useStaggeredDelay } from "../../../hooks/useStaggeredDelay";
import { useRef } from "react";

const SlidingBox = ({ children, duration = BASE_DURATION, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const delay = useStaggeredDelay({ inView, duration });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={delay !== null ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration, delay: delay ?? 0 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlidingBox;

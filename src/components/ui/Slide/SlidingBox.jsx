import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SlidingBox = ({
  children,
  duration = 0.6,
  startDelay = 0,
  className = "",
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={
          startDelay >= 0 && inView
            ? { y: 0, opacity: 1 }
            : { y: 50, opacity: 0 }
        }
        transition={{ duration, delay: startDelay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlidingBox;

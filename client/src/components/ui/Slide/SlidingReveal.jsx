import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useStaggeredDelay } from "../../../hooks/useStaggeredDelay";

const SlideReveal = ({
  children,
  className = "",
  duration = 0.8,
  ...props
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const delay = useStaggeredDelay({ inView, duration });

  return (
    <motion.div
      ref={ref}
      whileInView={"visible"}
      initial={"hidden"}
      exit={"hidden"}
      viewport={{ once: true }}
      transition={{ duration, ease: "easeOut", delay }}
      variants={{
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1 },
      }}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideReveal;

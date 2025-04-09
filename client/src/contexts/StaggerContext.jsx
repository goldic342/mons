import { createContext, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useCtx } from "../hooks/useCtx";

const StaggerContext = createContext(null);

export const useStagger = () => {
  const context = useCtx(StaggerContext, "Stagger");
  return context;
};

export const StaggerProvider = ({
  children,
  options = {},
  className = "",
  ...props
}) => {
  const variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: options.staggerChildren || 0.5,
        delayChildren: options.delayChildren || 0,
        ...options.transition,
      },
    },
    exit: {},
  };

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [inView, children, controls]);

  return (
    <StaggerContext.Provider value={{ parentVariants: variants }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        exit="exit"
        className={className}
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  );
};

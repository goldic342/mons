import { createContext, useRef } from "react";
import { motion } from "framer-motion";
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

  return (
    <StaggerContext.Provider value={{ parentVariants: variants }}>
      <motion.div
        initial="hidden"
        whileInView="show"
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

import { motion, useInView } from "framer-motion";

const SlideReveal = ({
  children,
  className = "",
  duration = 0.5,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.4 }}
      exit={"exit"}
      transition={{ duration, ease: "easeOut", delay: delay }}
      variants={{
        hidden: { height: 0, opacity: 0 },
        exit: { height: 0, opacity: 0 },
        show: {
          opacity: 1,
          height: "auto",
        },
      }}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideReveal;

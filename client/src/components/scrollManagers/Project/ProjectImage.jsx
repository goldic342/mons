import { motion, AnimatePresence } from "framer-motion";
import { projetVariants } from "../../ui/uiConfig";
const ProjectImage = ({ idx, scrollerId, p, currIndex }) => {
  const getTitleVariant = (idx, currentIndex) => {
    if (idx === currentIndex) return "active";
    if (idx < currentIndex) return "previous";
    if (idx >= currentIndex + 1) return "upcoming";
    return "inactive";
  };

  const isActive = idx === currIndex;
  const variant = getTitleVariant(idx, currIndex);
  const isAbove = idx < currIndex;
  const blurClass = variant === "upcoming" ? "blur-[2px]" : "";

  return (
    <AnimatePresence mode="popLayout">
      {isActive && (
        <motion.img
          layout={isAbove ? false : "position"}
          key={idx}
          id={`section-${scrollerId}-${idx}`}
          src={p.thumbnail}
          className={`h-[88vh] object-cover ${blurClass} ${isActive ? "mb-10" : ""}`}
          variants={projetVariants}
          initial="inactive"
          animate={variant}
          exit="previous"
        />
      )}
    </AnimatePresence>
  );
};

export default ProjectImage;

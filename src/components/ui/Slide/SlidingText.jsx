import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const SlidingText = ({
  text,
  delay = 0.1,
  startDelay = 0,
  className = "",
  onDelayCalculated,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const lines = text.split("\n");

  let finalDelay = startDelay;

  lines.forEach((line, lineIndex) => {
    line.split(" ").forEach((_, wordIndex) => {
      finalDelay += startDelay + lineIndex * 0.3 + wordIndex * delay;
    });
  });

  useEffect(() => {
    if (inView && onDelayCalculated) {
      onDelayCalculated(finalDelay);
    }
  }, [inView]);

  return (
    <div ref={ref} className={`overflow-hidden text-white ${className}`}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-wrap">
          {line.split(" ").map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: startDelay + lineIndex * 0.3 + wordIndex * delay,
              }}
              className="mr-2"
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SlidingText;

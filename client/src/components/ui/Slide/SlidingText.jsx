import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useStaggeredDelay } from "../../../hooks/useStaggeredDelay";
import { BASE_DURATION, LINE_DELAY, WORD_DELAY } from "../uiConfig";

const SlidingText = ({
  text,
  lineDelay = LINE_DELAY,
  wordDelay = WORD_DELAY,
  className = "",
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const lines = text.split("\n");

  const totalWords = lines.reduce(
    (acc, line) => acc + line.trim().split(/\s+/).length,
    0,
  );

  const totalDuration =
    (lines.length - 1) * lineDelay + (totalWords - lines.length) * wordDelay;

  const delay = useStaggeredDelay({ inView, duration: totalDuration });

  return (
    <div ref={ref} className={`overflow-hidden text-white ${className}`}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-wrap">
          {line
            .trim()
            .split(/\s+/)
            .map((word, wordIndex) => {
              const currWordDelay =
                (delay ?? 0) + lineIndex * lineDelay + wordIndex * wordDelay;

              return (
                <motion.span
                  key={wordIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={
                    delay !== null
                      ? { y: 0, opacity: 1 }
                      : { y: 50, opacity: 0 }
                  }
                  transition={{
                    duration: BASE_DURATION,
                    delay: currWordDelay,
                  }}
                  className="mr-2"
                >
                  {word}
                </motion.span>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default SlidingText;

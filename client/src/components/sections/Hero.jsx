import Noise from "../ui/Noise";
import { motion } from "framer-motion";
import SlidingBox from "../ui/Slide/SlidingBox";
import SlidingText from "../ui/Slide/SlidingText";
import { ChevronRight } from "lucide-react";
import { BASE_DURATION, baseSectionClass, headerPadding } from "../ui/uiConfig";
import { StaggerProvider } from "../../contexts/StaggerContext";
import TextButton from "../ui/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import { useSetHeader } from "../../hooks/useSetHeader";
import { calcTextDelay } from "../../utils/calcTextDelay";

const Hero = () => {
  const navigate = useNavigate();
  const value = useSetHeader();
  const text = "стратегическое\nпревосходство бренда"; // Placeholder
  console.log("c", calcTextDelay(text));
  return (
    <StaggerProvider
      className={`${baseSectionClass} bg-brand gap-y-43.5 ${headerPadding}`}
    >
      <div className="flex flex-col justify-center gap-y-9 ">
        <SlidingText
          text={text}
          className="text-white flex flex-col items-center font-serif text-2xl uppercase"
        />
        <StaggerProvider options={{ delayChildren: calcTextDelay(text) }}>
          <SlidingBox>
            <p className="text-grayish">
              Лаборатория стратегического бренд-консалтинга
            </p>
          </SlidingBox>
        </StaggerProvider>
      </div>
      <StaggerProvider
        options={{ delayChildren: calcTextDelay(text) + BASE_DURATION }}
      >
        <SlidingBox duration={0.3}>
          <TextButton
            className={
              "flex gap-x-2 text-white text-xs items-center group cursor-pointer"
            }
            onClick={() => navigate("/projects")}
          >
            узнать больше
            <ChevronRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </TextButton>
        </SlidingBox>
      </StaggerProvider>
      <Noise />
    </StaggerProvider>
  );
};

export default Hero;

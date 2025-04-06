import { useState } from "react";
import Noise from "../ui/Noise";
import SlidingBox from "../ui/Slide/SlidingBox";
import SlidingText from "../ui/Slide/SlidingText";
import { ChevronRight } from "lucide-react";
import { baseSectionClass } from "../ui/uiConfig";
import { StaggerProvider } from "../../contexts/StaggerContext";
import TextButton from "../ui/Buttons/TextButton";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`${baseSectionClass} bg-brand gap-y-43.5 pt-(--header-height)`}
    >
      <StaggerProvider>
        <div className="flex flex-col justify-center gap-y-9 ">
          <SlidingText
            text={"стратегическое\nпревосходство бренда"}
            className="text-white flex flex-col items-center font-serif text-2xl uppercase"
          />
          <SlidingBox>
            <p className="text-grayish">
              Лаборатория стратегического бренд-консалтинга
            </p>
          </SlidingBox>
        </div>
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
    </div>
  );
};

export default Hero;

import { useState } from "react";
import SlidingText from "../ui/Slide/SlidingText";
import Noise from "../ui/Noise";
import SlidingBox from "../ui/Slide/SlidingBox";
import { ChevronRight } from "lucide-react";
import { baseSectionClass } from "../ui/uiConstants";

const Hero = () => {
  const [startDelay, setStartDelay] = useState(-1);

  return (
    <div
      className={`${baseSectionClass} bg-brand gap-y-43.5 pt-(--header-height)`}
    >
      <div className="flex flex-col justify-center gap-y-9 ">
        <SlidingText
          text={"стратегическое\nпревосходство бренда"}
          className="text-white flex flex-col items-center font-serif text-2xl uppercase"
          onDelayCalculated={(d) => setStartDelay(d)}
        />
        <SlidingBox startDelay={startDelay}>
          <p className="text-grayish">
            Лаборатория стратегического бренд-консалтинга
          </p>
        </SlidingBox>
      </div>
      <SlidingBox startDelay={startDelay + 0.3} duration={0.3}>
        <button
          className="uppercase flex gap-x-2 text-white text-xs items-center group cursor-pointer"
          onClick={() => console.log("Clicked")} // TODO: add action
        >
          узнать больше
          <ChevronRight
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-2"
          />
        </button>
      </SlidingBox>
      <Noise />
    </div>
  );
};

export default Hero;

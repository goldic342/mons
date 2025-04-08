import { StaggerProvider } from "../../contexts/StaggerContext";
import Noise from "../ui/Noise";
import SlidingBox from "../ui/Slide/SlidingBox";
import { baseSectionClass } from "../ui/uiConfig";

const PreProjects = () => {
  return (
    <div className={`${baseSectionClass} bg-white2`}>
      <StaggerProvider>
        <SlidingBox className="uppercase text-2xl font-serif">
          наши кейсы
        </SlidingBox>
      </StaggerProvider>
      <Noise />
    </div>
  );
};

export default PreProjects;

import { useNavigate } from "react-router-dom";
import { ScrollProvider } from "../../contexts/ScrollContext";
import TextButton from "../ui/Buttons/TextButton";
import { calcMargin } from "../../utils/calcMargin";
import { AnimatePresence } from "framer-motion";
import { StaggerProvider } from "../../contexts/StaggerContext";
import SlidingBox from "../ui/Slide/SlidingBox";
import ProjectImage from "./Project/ProjectImage";

const ProjectScroll = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <ScrollProvider hideOverflow={false}>
      {(currIndex, scrollerId) => (
        <div className="w-full h-full flex justify-between">
          <div className="flex flex-col justify-between pb-15 pl-7.5 h-1/2 self-end w-[30%]">
            <StaggerProvider>
              <div className="flex justify-between text-xs">
                <span>
                  <SlidingBox className="inline-block">
                    <p>{currIndex + 1}</p>
                  </SlidingBox>
                  <SlidingBox className="inline-block text-second">
                    <p>/4</p>
                  </SlidingBox>
                </span>
                <SlidingBox>
                  <TextButton
                    onClick={() => navigate("/projects")}
                    className="text-xs text-second  whitespace-nowrap"
                  >
                    посмотреть кейсы
                  </TextButton>
                </SlidingBox>
              </div>
              <div className="flex flex-col gap-y-5">
                <div className="flex justify-between items-center font-bold text-sm">
                  <AnimatePresence>
                    <SlidingBox key={"pj-name"}>
                      {projects[currIndex].name}
                    </SlidingBox>
                    <SlidingBox
                      className="text-right whitespace-nowrap"
                      key={"pj-type"}
                      style={{
                        marginRight: calcMargin(
                          projects[currIndex].type,
                          16,
                          10,
                          8,
                        ),
                      }}
                    >
                      {projects[currIndex].type}
                    </SlidingBox>
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap text-sm text-second gap-x-3.75 max-w-[80%]">
                  <AnimatePresence>
                    {projects[currIndex].tags.map((tag, idx) => (
                      <SlidingBox key={`tag-${idx}`} className="first:pl-7">
                        {tag}
                      </SlidingBox>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </StaggerProvider>
          </div>

          <div className="w-[57%] h-full">
            {projects.map((p, idx) => (
              <ProjectImage
                p={p}
                idx={idx}
                key={`p-img-${idx}`}
                currIndex={currIndex}
                scrollerId={scrollerId}
              />
            ))}
          </div>
        </div>
      )}
    </ScrollProvider>
  );
};

export default ProjectScroll;

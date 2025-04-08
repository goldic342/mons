import { useNavigate } from "react-router-dom";
import { ScrollProvider } from "../../contexts/ScrollContext";
import TextButton from "../ui/Buttons/TextButton";
import ProjectImg from "../../assets/p-1.jpg";
import { calcMargin } from "../../utils/calcMargin";

const ProjectScroll = () => {
  const navigate = useNavigate();

  const title = "Инвестиционный фонд";
  return (
    <ScrollProvider>
      {(currIndex, scrollerId) => (
        <div className="w-full h-full flex justify-between">
          <div className="flex flex-col justify-between pb-15 pl-7.5 h-1/2 self-end w-[30%]">
            <div className="flex justify-between text-xs">
              <span>
                <p className="inline-block">1</p>
                <p className="inline-block text-second">1/4</p>
              </span>
              <TextButton
                onClick={() => navigate("/projects")}
                className="text-xs text-second  whitespace-nowrap"
              >
                посмотреть кейсы
              </TextButton>
            </div>

            <div className="flex flex-col gap-y-5">
              <div className="flex justify-between items-center font-bold text-sm">
                <p>Krondstadt Asset Management</p>
                <div
                  className="text-right whitespace-nowrap"
                  style={{ marginRight: `${calcMargin(title, 16, 10, 8)}px` }}
                >
                  <p>{title}</p>
                </div>
              </div>

              <div className="flex flex-wrap text-sm text-second gap-x-3.75 max-w-72.5">
                <p className="first:pl-7">Стратегия</p>
                <p>Айдентика</p>
                <p>Web</p>
                <p>Гайд</p>
                <p>Дистрибуционная концепция </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col w-[57%]">
            <img
              src={ProjectImg}
              alt="project"
              className="object-cover h-[86%]"
            />
          </div>
        </div>
      )}
    </ScrollProvider>
  );
};

export default ProjectScroll;

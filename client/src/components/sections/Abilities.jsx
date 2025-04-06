import Noise from "../ui/Noise";
import { StaggerProvider } from "../../contexts/StaggerContext";
import { useScroll } from "../../contexts/ScrollContext";
import TextButton from "../ui/Buttons/TextButton";
import SectionScroll from "../scrollManagers/SectionScroll";
import { useNavigate } from "react-router-dom";

const Abilities = () => {
  const { skipToSection, currentSectionIndex } = useScroll();
  const navigate = useNavigate();

  return (
    <div
      className={"w-full h-full bg-white2 flex justify-start items-end gap-50"}
    >
      <StaggerProvider>
        <div className="flex flex-col justify-between h-1/2 pl-7.5 pb-21.25 text-xs">
          <div>
            <p className="inline-block">1</p>
            <p className="inline-block text-second">/7</p>
          </div>
          <TextButton
            color={"second"}
            onClick={() => skipToSection(currentSectionIndex + 1)}
          >
            пропустить
          </TextButton>
        </div>
        <div className="flex justify-between w-full items-end ml-50 mr-37 h-full">
          <div className="h-1/2 text-xs mr-72.5">
            <TextButton color={"second"} onClick={() => navigate("/projects")}>
              посмотреть кейсы
            </TextButton>
          </div>
          <SectionScroll
            itemClassName="justify-between flex-1"
            className={"h-1/2 flex flex-col flex-1 "}
            sections={[
              {
                title: "Аналитика рынка и аудит бизнеса",
                content: (
                  <p>
                    Разработка бизнес-стратегии помогает вам выстроить план
                    достижения целей и успеха в условиях конкуренции. Мы
                    предоставляем глубокий анализ, включая как внутренние, так и
                    внешние факторы, а также помогаем создать действенные
                    стратегии для достижения ваших целей.
                  </p>
                ),
              },
              {
                title: "Бизнес-стратегия 1",
                content: <p>whatever_2</p>,
              },
              {
                title: "Брендинговая стратегия 2",
                content: <p>whatever_3</p>,
              },
              {
                title: "Брендинговая стратегия 3",
                content: <p>whatever_4</p>,
              },
              {
                title: "Брендинговая стратегия 4",
                content: <p>whatever_5</p>,
              },
            ]}
          />
        </div>
      </StaggerProvider>
      <Noise />
    </div>
  );
};

export default Abilities;

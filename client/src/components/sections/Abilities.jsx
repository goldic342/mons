import Noise from "../ui/Noise";
import { StaggerProvider } from "../../contexts/StaggerContext";
import SlidingBox from "../ui/Slide/SlidingBox";
import { useScroll } from "../../contexts/ScrollContext";
import TextButton from "../ui/Buttons/TextButton";
import SectionScroll from "../scrollManagers/SectionScroll";
import { useNavigate } from "react-router-dom";

const Abilities = () => {
  const { skipToSection, currentSectionIndex } = useScroll();
  const navigate = useNavigate();

  return (
    <StaggerProvider
      className="w-full h-full bg-white2 flex justify-between items-end"
      options={{ staggerChildren: 0.2 }}
    >
      <div className="flex flex-col justify-between h-1/2 pl-7.5 pb-21.25 text-xs">
        <div>
          <SlidingBox className={"inline-block"} reverse offset={20}>
            <p>1</p>
          </SlidingBox>
          <SlidingBox
            className={"inline-block text-second"}
            reverse
            offset={20}
          >
            <p>/7</p>
          </SlidingBox>
        </div>
        <SlidingBox offset={30} reverse>
          <TextButton
            color={"second"}
            onClick={() => skipToSection(currentSectionIndex + 1)}
          >
            пропустить
          </TextButton>
        </SlidingBox>
      </div>
      <div className="h-1/2 text-xs ">
        <SlidingBox offset={30} reverse>
          <TextButton color={"second"} onClick={() => navigate("/projects")}>
            посмотреть кейсы
          </TextButton>
        </SlidingBox>
      </div>

      <SectionScroll
        className={"h-1/2 flex flex-col w-[60%]"}
        sections={[
          {
            title: "Аналитика рынка и аудит бизнеса",
            content: (
              <div className="space-y-4">
                <p>
                  Погружение в мир вашего бизнеса начинается с детального
                  анализа ключевых показателей эффективности и комплексного
                  изучения бизнес-процессов. Мы проводим глубокую оценку данных,
                  выявляем ключевые тенденции рынка, конкурентного окружения и
                  потребительских предпочтений. Сотрудничая с ведущими
                  отраслевыми экспертами, мы предоставляем обоснованные
                  рекомендации и формируем персонализированные решения, которые
                  учитывают как внутренние ресурсы компании, так и внешние
                  рыночные факторы.
                </p>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
              </div>
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

      <Noise />
    </StaggerProvider>
  );
};

export default Abilities;

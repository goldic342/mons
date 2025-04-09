import ProjectScroll from "../scrollManagers/ProjectScroll";
import ProjectImg from "../../assets/p-1.jpg";

const Projects = () => {
  return (
    <div className={"w-full h-full flex bg-white2"}>
      <ProjectScroll
        projects={Array(3).fill({
          name: "Krondstadt Asset Management",
          type: "Инвестиционный фонд",
          tags: [
            "Стратегия",
            "Айдентика",
            "Web",
            "Гайд",
            "Дистрибуционная концепция ",
          ],
          thumbnail: ProjectImg,
        })}
      />
    </div>
  );
};

export default Projects;

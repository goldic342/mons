import FullPageScroll from "../components/scrollManagers/FullPageScroll";
import Abilities from "../components/sections/Abilities";
import Hero from "../components/sections/Hero";
import PreProjects from "../components/sections/PreProjects";
import Projects from "../components/sections/Projects";
import SupportText from "../components/sections/SupportText";
const Home = () => {
  return (
    <FullPageScroll>
      <Hero />
      <SupportText />
      <Abilities />
      <PreProjects />
      <Projects />
    </FullPageScroll>
  );
};

export default Home;

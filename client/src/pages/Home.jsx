import FullPageScroll from "../components/scrollManagers/FullPageScroll";
import Abilities from "../components/sections/Abilities";
import Hero from "../components/sections/Hero";
import SupportText from "../components/sections/SupportText";
const Home = () => {
  return (
    <FullPageScroll>
      <Hero />
      <SupportText />
      <Abilities />
    </FullPageScroll>
  );
};

export default Home;

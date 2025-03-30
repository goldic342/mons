import FullPageScroll from "../components/FullPageScroll";
import Hero from "../components/sections/Hero";
import SupportText from "../components/sections/SupportText";
const Home = () => {
  return (
    <FullPageScroll>
      <Hero />
      <SupportText />
    </FullPageScroll>
  );
};

export default Home;

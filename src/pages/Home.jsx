import FullPageScroll from "../components/FullPageScroll";
import Sec from "../components/Sec";
const Home = () => {
  return (
    <FullPageScroll>
      <div className="bg-green-300 h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-4">Section 1</h1>
        <p>Scroll or use the child's skip function from next sections!</p>
      </div>

      <div className="bg-blue-300 h-full w-full">
        <Sec />
      </div>

      <div className="bg-purple-300  h-full w-full flex items-center justify-center">
        <h1 className="text-4xl">Section 3</h1>
      </div>

      <div className="bg-yellow-300  h-full w-full flex items-center justify-center">
        <h1 className="text-4xl">Section 4 (target of the skip)</h1>
      </div>

      <div className="bg-red-300 h-full w-full flex items-center justify-center">
        <h1 className="text-4xl">Section 5</h1>
      </div>
    </FullPageScroll>
  );
};

export default Home;

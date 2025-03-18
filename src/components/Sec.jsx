import { useScroll } from "../contexts/ScrollContext";

export default function Sec() {
  const { skipToSection, currentSectionIndex } = useScroll();

  const handleSkip = () => {
    skipToSection(3);
  };

  const handleWheel = (e) => {};
  return (
    <div
      className="bg-blue-300 w-full h-full flex flex-col items-center justify-center"
      onWheel={(e) => handleWheel(e)}
    >
      <div className="text-center">
        <p className="mb-4">Current section index: {currentSectionIndex}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSkip}
        >
          Skip to Section 4
        </button>
      </div>
    </div>
  );
}

import SlidingBox from "../ui/Slide/SlidingBox";
import { baseSectionClass } from "../ui/uiConstants";

const SupportText = () => {
  return (
    <div
      className={`${baseSectionClass} text-2xl text-white font-serif uppercase pb-14`}
      style={{
        background: "linear-gradient(180deg, #1C173E 10%, #F7F7F7 100%)",
      }}
    >
      <SlidingBox duration={0.4}>
        <p>мы поддерживаем вас на всех</p>
      </SlidingBox>

      <SlidingBox startDelay={0.4}>
        <p>этапах построения бизнеса</p>
      </SlidingBox>
    </div>
  );
};

export default SupportText;

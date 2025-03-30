import NoiseImg from "../../assets/noise.png";

const Noise = ({ opacity = 1 }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: `url(${NoiseImg})`,
        backgroundRepeat: "repeat",
        mixBlendMode: "soft-light",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: opacity,
      }}
    ></div>
  );
};

export default Noise;

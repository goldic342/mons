import NavLink from "./NavLink";
import Logo from "../../assets/mons.svg";
import { Link } from "react-router-dom";
import TextButton from "./Buttons/TextButton";
import { useHeader } from "../../contexts/HeaderContext";

const Header = () => {
  const { color } = useHeader();
  console.log(color);
  return (
    <header
      style={{ color: `var(--color-${color})` }} // BUG: flickering in firefox
      className={`w-full flex justify-between px-7 pt-14.5 uppercase text-xs fixed z-10 transition-* duration-1000`}
    >
      <Link to={"/"}>
        <img src={Logo} alt="mons" />
      </Link>
      <nav className="flex gap-x-9.25 ">
        <NavLink to="/projects">проекты</NavLink>
        <NavLink to="/about">о нас</NavLink>
        <NavLink to="/contacts">контакты</NavLink>
      </nav>
      <TextButton>связаться</TextButton>
    </header>
  );
};

export default Header;

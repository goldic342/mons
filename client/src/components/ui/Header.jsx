import NavLink from "./NavLink";
import Logo from "../../assets/mons.svg";
import { Link } from "react-router-dom";
import TextButton from "./Buttons/TextButton";
import { useHeader } from "../../contexts/HeaderContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Header = () => {
  const { color, logo } = useHeader();
  const [currentLogo, setCurrentLogo] = useState(logo || Logo);

  useEffect(() => {
    if (logo && logo !== currentLogo) {
      setCurrentLogo(logo);
    }
  }, [logo, currentLogo]);

  return (
    <header
      style={{ color: `var(--color-${color})` }} // BUG: flickering in firefox
      className={`w-full flex justify-between px-7 pt-14.5 uppercase text-xs fixed z-10 transition-* duration-1000`}
    >
      <Link to={"/"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentLogo}
            src={currentLogo}
            alt="mons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
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

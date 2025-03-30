import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
  return (
    <Link to={to} className="transition-colors duration-400 hover:text-link">
      {children}
    </Link>
  );
};

export default NavLink;

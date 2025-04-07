import { Outlet } from "react-router-dom";
import Header from "./Header";
import { HeaderProvider } from "../../contexts/HeaderContext";

const Layout = () => {
  return (
    <HeaderProvider>
      <Header />
      <Outlet />
    </HeaderProvider>
  );
};

export default Layout;

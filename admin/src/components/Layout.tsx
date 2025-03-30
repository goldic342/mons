import type { ReactNode } from "react";
import { CheckForApplicationUpdate, Layout as RALayout } from "react-admin";

const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

export default Layout;

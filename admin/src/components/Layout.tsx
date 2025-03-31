import { Layout as RaLayout, AppBar as RaAppBar } from "react-admin";
import { AppBarProps } from "ra-ui-materialui";
import { Box, useMediaQuery } from "@mui/material";
import Logo from "../assets/mons.svg";
import type { ReactNode } from "react";

import { CheckForApplicationUpdate } from "react-admin";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const CustomAppBar = (props: AppBarProps) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <RaAppBar {...props}>
      <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
        {isSmall && (
          <IconButton color="inherit" edge="start">
            <MenuIcon />
          </IconButton>
        )}
        <img alt="Company Logo" src={Logo} />
      </Box>
    </RaAppBar>
  );
};

const Layout = ({ children }: { children: ReactNode }) => (
  <RaLayout appBar={CustomAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RaLayout>
);

export default Layout;

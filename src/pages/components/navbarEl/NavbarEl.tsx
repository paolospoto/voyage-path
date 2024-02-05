import { NavbarElProps } from "./types";
import { NavLink } from "@mantine/core";

import { usePathname } from "next/navigation";

const NavbarEl: React.FC<NavbarElProps> = ({ children, link, icon, title }) => {
  let path = usePathname();

  return (
    <NavLink
      href={link}
      leftSection={title}
      rightSection={icon}
      active={path === link}
      style={{ textDecoration: "none" }}
    >
      {children}
    </NavLink>
  );
};

export default NavbarEl;

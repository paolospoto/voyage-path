import { Flex } from "@mantine/core";

import NavbarEl from "../navbarEl";
import {
  IconFavicon,
  IconHeart,
  IconHome,
  IconMan,
  IconMap,
  IconPlus,
} from "@tabler/icons-react";
import ColorScheme from "../colorScheme";
import { useState } from "react";

const Navbar = () => {
  const [scheme, setScheme] = useState("");

  const handleSchemeChange = (scheme: string) => {
    setScheme(scheme);
  };
  return (
    <Flex direction={"column"} className="Navbar">
      <ColorScheme />
      <NavbarEl link="/" icon={<IconHome />} title={"HOME"} />
      <NavbarEl link="/test" icon={<IconMap />} title={"ITINERARY"}>
        <NavbarEl link="/test" icon={<IconHeart />} title={"MY IT"} />
        <NavbarEl link="/test" icon={<IconPlus />} title={"NEW IT"} />
      </NavbarEl>
    </Flex>
  );
};

export default Navbar;

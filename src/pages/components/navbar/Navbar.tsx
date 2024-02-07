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
  return (
    <Flex direction={"column"} className="Navbar">
      <ColorScheme />
      <NavbarEl link="/" icon={<IconHome />} title={"HOME"} />
      <NavbarEl link="/xs" icon={<IconMap />} title={"ITINERARY"}>
        <NavbarEl link="/myItineraries" icon={<IconHeart />} title={"MY IT"} />
        <NavbarEl
          link="/itineraryBuilder"
          icon={<IconPlus />}
          title={"NEW IT"}
        />
      </NavbarEl>
    </Flex>
  );
};

export default Navbar;

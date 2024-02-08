"use client";

import Navbar from "../navbar";

import { PageShellProps } from "@/utils/types";

import { AppShell, Burger, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Header from "../header";

const PageShell: React.FC<PageShellProps> = ({ children, pt }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      style={{ zIndex: 9999 }}
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      footer={{ height: 40 }}
    >
      <AppShell.Header>
        <Flex h={"100%"} justify={"space-between"} align={"center"} p={"xs"}>
          <Burger opened={opened} onClick={toggle} size="sm" />

          <Header />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main p={0} pt={pt}>
        {children}
      </AppShell.Main>
      <AppShell.Footer style={{ backgroundColor: "#5072ad", color: "white" }}>
        Footer
      </AppShell.Footer>
    </AppShell>
  );
};

export default PageShell;

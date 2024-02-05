import { readItem } from "@/utils/storage";
import { Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

const ColorScheme = () => {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const [isChecked, setIsChecked] = useState(false);
  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: 16, height: 16 }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoon
      style={{ width: 16, height: 16 }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );
  useEffect(() => {
    readItem("mantine-color-scheme-value") === "dark"
      ? setIsChecked(true)
      : setIsChecked(false);
  }, []);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      setColorScheme("dark");
      setIsChecked(true);
    } else {
      setColorScheme("light");
      setIsChecked(false);
    }
  };

  return (
    <Switch
      checked={isChecked}
      onChange={(event) => handleSwitch(event)}
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      p={10}
    />
  );
};

export default ColorScheme;

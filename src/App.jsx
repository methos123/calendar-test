import React from "react";
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider, Global } from "@mantine/core";

import AppContent from "./AppContent";

export default function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.colors.gray[1]
            }
          })}
        />
        <AppContent />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

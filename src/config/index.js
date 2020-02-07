import React from "react";
const ThemeContext = React.createContext({
    themeDark : true,
    isThemeDark : () => {}
});
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
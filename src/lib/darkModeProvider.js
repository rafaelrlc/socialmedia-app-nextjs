import DarkModeContext from "./darkModeContext";
import { useState } from "react";

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const values = {
    darkMode,
    setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={values}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;

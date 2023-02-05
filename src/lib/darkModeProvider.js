import DarkModeContext from "./darkModeContext";
import { useState } from "react";

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode);

  const values = {
    darkMode: darkMode,
    setDarkMode: setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={values}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;

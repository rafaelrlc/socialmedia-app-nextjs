import DarkModeContext from "@/lib/darkModeContext";
import { useContext } from "react";

export const useDarkMode = () => useContext(DarkModeContext);

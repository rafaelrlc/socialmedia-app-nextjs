import UserContext from "@/lib/userContext";
import { useContext } from "react";

export const useAuth = () => useContext(UserContext);

import UserContext from "./userContext";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;

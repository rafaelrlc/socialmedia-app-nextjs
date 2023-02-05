import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "@/lib/userProvider";
import DarkModeProvider from "@/lib/darkModeProvider";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <DarkModeProvider>
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Toaster></Toaster>
      </DarkModeProvider>
    </UserContextProvider>
  );
}

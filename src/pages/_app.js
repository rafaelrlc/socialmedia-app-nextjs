import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "@/lib/userProvider";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Toaster></Toaster>
    </UserContextProvider>
  );
}

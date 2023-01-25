import "@/styles/globals.css";
import { Fragment } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Toaster></Toaster>
    </Fragment>
  );
}

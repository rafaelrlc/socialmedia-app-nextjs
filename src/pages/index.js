import Head from "next/head";
import Link from "next/link";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <button onClick={() => toast.success("hello toast")}>Toast Me</button>
    </div>
  );
}

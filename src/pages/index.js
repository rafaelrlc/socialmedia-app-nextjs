import Head from "next/head";
import Link from "next/link";
import Spinner from "../components/UI/Spinner";
import toast from "react-hot-toast";
import { async } from "@firebase/util";

export default function Home() {
  return (
    <div>
      <button onClick={() => toast.success("hello toast")}>Toast Me</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

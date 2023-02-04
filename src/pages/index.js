import Head from "next/head";
import Link from "next/link";
import Spinner from "../components/UI/Spinner";
import { StyledButton } from "@/components/UI/Button";
import toast from "react-hot-toast";
import { use, useState } from "react";
import {
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { postToJSON } from "@/lib/firebase";
import PostFeed from "@/components/Posts/PostFeed";

const LIMIT = 10;
export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [isLoading, setIsLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setIsLoading(true);
    const last = posts[posts.length - 1];

    const lastElement =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const q = query(
      collectionGroup(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(lastElement),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(q)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setIsLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  return (
    <main>
      <PostFeed posts={posts}></PostFeed>
      {isLoading && <Spinner></Spinner>}

      {!isLoading && !postsEnd && (
        <StyledButton onClick={getMorePosts} color="gray">
          More
        </StyledButton>
      )}
    </main>
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

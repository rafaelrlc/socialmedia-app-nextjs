import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import Spinner from "@/components/UI/Spinner";
import { async } from "@firebase/util";
import { getUserWithUsername, postToJSON } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import PostFeed from "@/components/Posts/PostFeed";
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

const UserPostPage = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(post);
  return (
    <main>
      {isLoading && <Spinner></Spinner>}
      <PostFeed posts={[post]}></PostFeed>
    </main>
  );
};

export default UserPostPage;

export async function getStaticPaths() {
  // Improve by using Admin SDK to select empty docs
  const posts = query(collectionGroup(db, "posts"));
  const snapshot = await getDocs(posts);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  let post;
  let path;

  const userDoc = await getUserWithUsername(username);

  if (userDoc) {
    const postRef = doc(db, "users", userDoc.id, "posts", slug);
    const postSnap = await getDoc(postRef);
    //console.log(postSnap);
    post = postToJSON(postSnap);

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

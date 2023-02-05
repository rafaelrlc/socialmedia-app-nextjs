import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import Spinner from "@/components/UI/Spinner";
import { async } from "@firebase/util";
import { getUserWithUsername, postToJSON } from "@/lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import PostContent from "@/components/Posts/PostContent";

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

const UserPostPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const postRef = doc(db, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  //console.log(props.post);
  return (
    <main>
      {isLoading && <Spinner></Spinner>}
      {post && <PostContent post={props.post}></PostContent>}
      {!post && <h1>404</h1>}
    </main>
  );
};

export default UserPostPage;

export async function getStaticPaths() {
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
  let post = null;
  let path = null;

  const userDoc = await getUserWithUsername(username);

  if (userDoc) {
    const postRef = doc(db, "users", userDoc.id, "posts", slug);
    const postSnap = await getDoc(postRef);
    if (!postSnap.data()) {
      return {
        notFound: true,
      };
    }
    post = postToJSON(postSnap);
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

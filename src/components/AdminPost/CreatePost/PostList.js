import { useAuth } from "@/hooks/useAuth";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState, Fragment } from "react";
import PostFeed from "../../Posts/PostFeed";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

const PostList = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  // second option:

  // const q = query(
  //   collection(db, "users", user.uid, "posts"),
  //   orderBy("createdAt")
  // );
  // const [querySnapshot] = useCollectionData(q);
  // console.log(querySnapshot);

  const getPosts = async () => {
    const q = query(
      collection(db, "users", user.uid, "posts"),
      orderBy("createdAt")
    );
    const snapshot = await getDocs(q);

    const uPosts = snapshot?.docs.map((doc) => doc.data());
    setPosts(uPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Fragment>
      <h1 className="center">Manage Your Posts</h1>
      <PostFeed posts={posts} admin={true}></PostFeed>
    </Fragment>
  );
};

export default PostList;

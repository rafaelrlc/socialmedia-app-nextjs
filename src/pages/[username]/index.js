import { db, getUserWithUsername, postToJSON } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import UserProfile from "@/components/UserProfile";
import PostFeed from "@/components/Posts/PostFeed";

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}

export async function getServerSideProps({ query: q }) {
  const { username } = q;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  user = userDoc.data();

  const postsQuery = query(
    collection(db, "users", userDoc.id, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

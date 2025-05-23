import { db, getUserWithUsername, postToJSON } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import UserProfile from "@/components/UserProfile";
import PostFeed from "@/components/Posts/PostFeed";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function UserProfilePage({ user, posts }) {
  const { user: currentUser } = useAuth();
  const router = useRouter();

  // Função para deletar post
  const handleDeletePost = useCallback(
    async (postId) => {
      if (!currentUser || currentUser.uid !== user.uid) return;
      if (!confirm("Tem certeza que deseja deletar este post?")) return;
      try {
        await deleteDoc(doc(db, "users", user.uid, "posts", postId));
        router.replace(router.asPath); // Atualiza a página
      } catch (e) {
        alert("Erro ao deletar post.");
      }
    },
    [currentUser, user, router]
  );

  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} onDeletePost={handleDeletePost} currentUser={currentUser} profileUser={user} />
    </main>
  );
}

export async function getServerSideProps({ query: q }) {
  const { username } = q;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

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
    props: { user, posts },
  };
}

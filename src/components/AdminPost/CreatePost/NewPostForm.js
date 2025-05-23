import { useAuth } from "@/hooks/useAuth";
import { StyledButton } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { useRouter } from "next/router";
import { useState } from "react";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const NewPost = () => {
  const router = useRouter();

  const { username } = useAuth();
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [title, setTitle] = useState("");
  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;

    const ref = doc(db, "users", uid, "posts", slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# write here!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(ref, data);
    toast.success("Post created!");

    router.push(`/admin/${slug}`); // move to the created post
  };

  return (
    <form onSubmit={createPost}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Article"
        className="admin_input"
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <StyledButton color="green" type="submit" disabled={!isValid} style={{ marginTop: "15px" }}>
        Create New Post
      </StyledButton>
    </form>
  );
};

export default NewPost;

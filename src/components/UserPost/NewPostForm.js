import { useAuth } from "@/hooks/useAuth";
import { Input } from "../UI/Input";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const NewPost = () => {
  const router = useRouter();
  const { username } = useAuth();
  const [title, setTitle] = useState("");
  const slug = encodeURI(kebabCase(title));
  const createPost = () => {};

  return (
    <form onSubmit={createPost}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Article!"
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
};

export default NewPost;

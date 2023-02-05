import { useAuth } from "@/hooks/useAuth";
import { Input } from "../UI/Input";
import { useRouter } from "next/router";
import { useState } from "react";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { StyledButton } from "../UI/Button";

const NewPost = () => {
  const router = useRouter();

  const { username } = useAuth();

  const [title, setTitle] = useState("");
  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = () => {};

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
      <StyledButton color="green" type="submit" disabled={!isValid}>
        Create New Post
      </StyledButton>
    </form>
  );
};

export default NewPost;

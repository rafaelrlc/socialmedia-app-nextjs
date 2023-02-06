import { useForm } from "react-hook-form";

import styles from "../../../styles/admin.module.css";
import styled from "styled-components";
import { StyledButton } from "@/components/UI/Button";
import { updateDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { PostCard } from "@/components/Posts/PostItem";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";
function PostForm({ defaultValues, postRef, preview }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  // isDirty if the user hasnt interacted (changed defaultValue)

  const updatePost = async ({ content, published }) => {
    console.log(content, published);

    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className={styles.card}>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <textarea
          name="content"
          {...register("content", {
            maxLength: { value: 20000, message: "Content is too long!" },
            minLength: { value: 10, message: "Content is too short!" },
            required: { value: true, message: "Content is required!" },
          })}
        ></textarea>

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <fieldset>
          <input
            className={styles.checkbox}
            name="published"
            type="checkbox"
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>

        <StyledButton
          color="green"
          type="submit"
          className="admin-btn"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </StyledButton>
      </div>
    </form>
  );
}

export default PostForm;

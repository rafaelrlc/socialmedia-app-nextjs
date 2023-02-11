import { StyledButton } from "../../UI/Button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styles from "../../../styles/admin.module.css";
import PostForm from "./PostForm";

const PostManager = () => {
  const { user } = useAuth();
  const [preview, setPreview] = useState();

  const router = useRouter();
  const { slug } = router.query;

  const ref = doc(db, "users", user.uid, "posts", slug);
  const [post] = useDocumentData(ref);

  // const getPost = async () => {
  //   const docSnap = await getDoc(ref);
  //   if (docSnap.exists()) {
  //     console.log(docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // };

  // useEffect(() => {
  //   getPost();
  // }, []);

  return (
    <main>
      <section>
        <h1>{post?.title}</h1>
        <p>ID: {post?.slug}</p>
      </section>
      <div className={styles.container}>
        {post && (
          <>
            <section>
              <PostForm
                postRef={ref}
                defaultValues={post}
                preview={preview}
              ></PostForm>
            </section>
            <aside className={styles.tools_card}>
              <h3 className="center">Tools</h3>
              <StyledButton color="gray" onClick={() => setPreview(!preview)}>
                {preview ? "Edit" : "Preview"}
              </StyledButton>
              <StyledButton
                onClick={() => router.push(`/${post.username}/${post.slug}`)}
                color="blue"
              >
                Live View{" "}
              </StyledButton>
            </aside>
          </>
        )}
      </div>
    </main>
  );
};

export default PostManager;

import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import { StyledButton } from "../UI/Button";

const PostCard = styled.div`
  padding: 2rem;
  margin: 1rem 0;
  background-color: white;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & footer {
    display: flex;
    align-items: center;
  }

  .card-img-center {
    width: 20%;
    display: block;
    margin: auto;
    border-radius: 50%;
    max-width: 150px;
  }

  .card-info {
    color: white;
    background: var(--color-blue);
  }

  .postLikes {
    display: flex;
  }
`;

const PostItem = ({ post, admin = false }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const readTime = (wordCount / 100 + 1).toFixed(0);

  return (
    <PostCard>
      <div>
        <Link href={`/${post.username}`}>
          <strong>By @{post.username}</strong>
        </Link>
      </div>
      <div>
        <Link href={`/${post.username}/${post.slug}`}>
          <h2>{post.title}</h2>
        </Link>
      </div>

      <footer>
        <span>
          {wordCount} words. {readTime} min read
        </span>

        <div className="push-left">
          <button className="heart-button">❤️ {post.heartCount || 0} </button>
        </div>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <StyledButton color="blue">Edit</StyledButton>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </PostCard>
  );
};

export default PostItem;

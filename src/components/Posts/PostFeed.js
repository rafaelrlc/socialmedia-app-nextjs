import Link from "next/link";
import PostItem from "./PostItem";

const PostFeed = ({ posts, admin }) => {
  const listPost = posts.map((post) => (
    <PostItem post={post} key={post.slug} admin={admin} />
  ));

  return <ul>{listPost}</ul>;
};

export default PostFeed;

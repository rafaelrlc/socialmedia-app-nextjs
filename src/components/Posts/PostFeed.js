import PostItem from "./PostItem";

const PostFeed = ({ posts, admin, onDeletePost, currentUser, profileUser }) => {
  const listPost = posts.map((post) => (
    <PostItem
      post={post}
      key={post.slug}
      admin={admin}
      onDeletePost={onDeletePost}
      currentUser={currentUser}
      profileUser={profileUser}
    />
  ));

  return <ul>{listPost}</ul>;
};

export default PostFeed;
import MetaTags from "@/components/Metatags";
import AuthCheck from "@/components/AuthCheck/AuthCheck";
import PostManager from "@/components/AdminPost/ManagePost/PostManager";
const UserPosts = () => {
  return (
    <AuthCheck>
      <MetaTags title="admin page"></MetaTags>
      <PostManager />
    </AuthCheck>
  );
};

export default UserPosts;

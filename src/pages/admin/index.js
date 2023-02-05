import AuthCheck from "@/components/AuthCheck/AuthCheck";
import NewPost from "@/components/UserPost/NewPostForm";
import PostList from "@/components/UserPost/PostList";

const AdminPage = () => {
  return (
    <main>
      <AuthCheck>
        <PostList></PostList>
        <NewPost></NewPost>
      </AuthCheck>
    </main>
  );
};

export default AdminPage;

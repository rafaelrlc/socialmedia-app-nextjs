import AuthCheck from "@/components/AuthCheck/AuthCheck";
import NewPost from "@/components/AdminPost/CreatePost/NewPostForm";
import PostList from "@/components/AdminPost/CreatePost/PostList";

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

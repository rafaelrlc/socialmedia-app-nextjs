import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/UI/Spinner";

const UserPostPage = () => {
  const { username } = useAuth();
  return (
    <main>
      <h1>{username}'s Posts:</h1>
      <Spinner show={false}></Spinner>
    </main>
  );
};

export default UserPostPage;

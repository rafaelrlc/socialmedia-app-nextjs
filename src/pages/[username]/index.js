import { useAuth } from "@/hooks/useAuth";

const UserProfilePage = () => {
  const { username } = useAuth();
  return (
    <main>
      <h1>{username}'s Profile</h1>
    </main>
  );
};

export default UserProfilePage;

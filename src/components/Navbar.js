import Link from "next/link";
import styled from "styled-components";
import { StyledButton } from "./UI/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useDarkMode } from "@/hooks/useDarkMode";

const StyledNavbar = styled.nav`
  height: 70px;
  width: 100%;
  background: white;
  color: var(--colors-text);
  padding: 0 5rem;
  font-weight: bold;
  border-bottom: 1px solid var(--color-gray);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .left-side {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  & .right-side {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  & img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 1rem;
    & img {
      width: 40px;
      height: 40px;
    }
  }
`;


export default function Navbar() {
  const { user, username } = useAuth();
  const router = useRouter();
  const { darkMode, setDarkMode } = useDarkMode();

  const mySignOut = () => {
    auth.signOut();
    router.reload();
  };

  const goS = () => {
    setDarkMode(!darkMode);
  };

  // Função de login com Google direto na navbar
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const authInstance = getAuth();
      await signInWithPopup(authInstance, provider);
      router.reload();
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

return (
  <StyledNavbar>
    <div className="left-side">
      <Link href="/">
        <StyledButton className="btn-logo">Blog</StyledButton>
      </Link>
    </div>
    <div className="right-side">
      {username ? (
        <>
          <Link href="/admin">
            <StyledButton color="black">Write Posts</StyledButton>
          </Link>
          <StyledButton onClick={mySignOut} color="gray">
            Logout
          </StyledButton>
          <Link href={`/${username}`}>
            <img src={user?.photoURL} />
          </Link>
        </>
      ) : (
        <StyledButton
          style={{
            background: "#fff",
            color: "#222",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontWeight: 500,
            padding: "0.5rem 1rem",
          }}
          onClick={signInWithGoogle}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: 20, height: 20 }}
          />
          Log in com Google
        </StyledButton>
      )}
    </div>
  </StyledNavbar>
);
}
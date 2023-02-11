import Link from "next/link";
import styled from "styled-components";
import { StyledButton } from "./UI/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

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

  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  & img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  & li {
    border-radius: 50%;
  }

  .right-side {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }

  .left-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }

  @media only screen and (max-width: 768px) {
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
  return (
    <StyledNavbar>
      <ul>
        <li className="left-side">
          <StyledButton
            className="dark-mode-btn"
            color={!darkMode ? "black" : "white"}
            bg_color={!darkMode ? "white" : "black"}
            border_color={!darkMode ? "black" : "white"}
            onClick={goS}
          >
            {darkMode == true ? (
              <MdDarkMode></MdDarkMode>
            ) : (
              <MdOutlineDarkMode></MdOutlineDarkMode>
            )}
          </StyledButton>
          <Link href="/">
            <StyledButton className="btn-logo">HOME</StyledButton>
          </Link>
        </li>

        {/* user signed */}

        {username && (
          <div className="right-side">
            <li>
              <StyledButton onClick={mySignOut} color="gray">
                Sign Out
              </StyledButton>
            </li>
            <li>
              <Link href="/admin">
                <StyledButton color="blue">Write Posts</StyledButton>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </div>
        )}

        {/* user not signed */}
        {!username && (
          <li>
            <Link href="/enter">
              <StyledButton color="blue">Log in</StyledButton>
            </Link>
          </li>
        )}
      </ul>
    </StyledNavbar>
  );
}

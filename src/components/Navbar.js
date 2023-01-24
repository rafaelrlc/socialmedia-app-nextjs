import Link from "next/link";
import { Fragment } from "react";
import styled from "styled-components";
import { StyledButton } from "./UI/Button";

const StyledNavbar = styled.nav`
  height: 70px;
  width: 100%;
  background: white;
  color: var(--colors-text);
  padding: 0 10rem;
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
`;

export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <StyledNavbar>
      <ul>
        <li>
          <Link href="/">
            <StyledButton className="btn-logo">FEED</StyledButton>
          </Link>
        </li>

        {/* user signed */}

        {username && (
          <Fragment>
            <li className="push-left">
              <Link href="/admin">
                <StyledButton color="blue">Write Posts</StyledButton>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </Fragment>
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

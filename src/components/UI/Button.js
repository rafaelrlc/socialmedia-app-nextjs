import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => (props.color ? props.color : "gray")};
  border: none;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  font-family: "Noto Sans", sans-serif;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0.5rem 1rem 0.5rem 0;

  &:hover {
    filter: brightness(90%);
  }

  &:disabled,
  &[disabled] {
    filter: brightness(80%);
    cursor: not-allowed;
  }

  &.btn-google {
    background-color: white;
    color: var(--color-text);
  }

  &.btn-google img {
    width: 30px;
    margin-right: 10px;
  }

  &.btn-logo {
    background-color: var(--color-text);
    color: white;
    text-transform: uppercase;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }

  .btn-google img {
    width: 30px;
    margin-right: 10px;
  }

  @media only screen and (max-width: 768px) {
    & {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
  }
`;

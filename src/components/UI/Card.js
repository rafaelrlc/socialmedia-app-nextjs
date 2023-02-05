import styled from "styled-components";

const Card = styled.div`
  padding: 2rem;
  margin: 1rem 0;
  background-color: white;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  & footer {
    display: flex;
  }

  .card-img-center {
    width: 20%;
    display: block;
    margin: auto;
    border-radius: 50%;
    max-width: 150px;
  }

  .card-info {
    color: white;
    background: var(--color-blue);
  }
`;

export default Card;

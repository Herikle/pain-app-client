import styled from "styled-components";

export const Input = styled.input`
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 1rem;
  font-size: 1.5rem;
  width: 100%;
  &:read-only {
    cursor: inherit;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

import styled from "styled-components";
import { NumericFormat } from "react-number-format";

export const Input = styled(NumericFormat)`
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 1rem;
  width: 100%;
  &:read-only {
    cursor: inherit;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

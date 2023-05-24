"use client";

import { styled } from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export const Button = ({ children, loading, onClick }: ButtonProps) => {
  return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>;
};

const ButtonContainer = styled.button``;

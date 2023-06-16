import { LoadingWrapper } from "@components/LoadingWrapper";
import { PlusCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import Link from "next/link";
import styled, { css } from "styled-components";

type CustomLoadingButtonProps = {
  icon: JSX.Element;
  size: number;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
};

export const CustomLoadingButton = ({
  icon,
  size,
  onClick,
  href,
  loading,
}: CustomLoadingButtonProps) => {
  const render = (children) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }

    return children;
  };

  return render(
    <Container
      onClick={!!loading ? undefined : onClick}
      $size={size}
      $isLoading={!!loading}
    >
      <LoadingWrapper loading={!!loading} overContainer size={16} />
      {icon}
    </Container>
  );
};

type ContainerProps = {
  $size: number;
  $isLoading: boolean;
};

const Container = styled.div<ContainerProps>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  cursor: pointer;
  position: relative;
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`;

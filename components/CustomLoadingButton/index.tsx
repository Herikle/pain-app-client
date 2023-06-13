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
    <Container onClick={onClick} $size={size}>
      <LoadingWrapper loading={!!loading} overContainer size={16} />
      {icon}
    </Container>
  );
};

type ContainerProps = {
  $size: number;
};

const Container = styled.div<ContainerProps>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  cursor: pointer;
  position: relative;
`;

import { LoadingWrapper } from "@components/LoadingWrapper";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";

type CustomLoadingButtonProps = {
  icon: JSX.Element;
  size: number;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  tooltip?: {
    text: string;
    id: string;
  };
};

export const CustomLoadingButton = ({
  icon,
  size,
  onClick,
  href,
  loading,
  disabled,
  tooltip,
}: CustomLoadingButtonProps) => {
  const render = (children) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }

    return children;
  };

  return render(
    <>
      <Container
        onClick={!!loading ? undefined : onClick}
        id={tooltip?.id}
        $size={size}
        $isLoading={!!loading}
        $disabled={disabled}
        $hasOnClick={!!onClick}
      >
        <LoadingWrapper loading={!!loading} overContainer size={16} />
        {icon}
      </Container>
      {tooltip && (
        <Tooltip anchorSelect={`#${tooltip.id}`}>{tooltip.text}</Tooltip>
      )}
    </>
  );
};

type ContainerProps = {
  $size: number;
  $isLoading: boolean;
  $hasOnClick?: boolean;
  $disabled?: boolean;
};

const Container = styled.div<ContainerProps>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}

  ${({ $hasOnClick }) =>
    $hasOnClick &&
    css`
      cursor: pointer;
    `}

  position: relative;
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`;

import { LoadingWrapper } from "@components/LoadingWrapper";
import { PlusCircle } from "@phosphor-icons/react";
import { ThemeColors, theme } from "@styles/theme";
import Link from "next/link";
import styled from "styled-components";

type AddButtonProps = {
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  id?: string;
  color?: ThemeColors;
};

export const AddButton = ({
  onClick,
  href,
  loading,
  id,
  color,
}: AddButtonProps) => {
  const render = (children) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }

    return children;
  };

  const getButtonColor = () => {
    if (loading) return theme.colors.disabled_color;

    if (color) return theme.colors[color];

    return theme.colors.primary;
  };

  return render(
    <Container id={id}>
      <LoadingWrapper loading={!!loading} overContainer size={16} />
      <PlusCircle
        onClick={onClick}
        cursor="pointer"
        size={32}
        weight="fill"
        color={getButtonColor()}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
`;

import { LoadingWrapper } from "@components/LoadingWrapper";
import { PlusCircle } from "@phosphor-icons/react";
import { ThemeColors, theme } from "@styles/theme";
import Link from "next/link";
import styled from "styled-components";

type AddButtonProps = {
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  href?: string;
  loading?: boolean;
  id?: string;
  color?: ThemeColors;
  "data-cy"?: string;
};

export const AddButton = ({
  onClick,
  href,
  loading,
  id,
  color,
  "data-cy": dataCy,
}: AddButtonProps) => {
  const render = (children) => {
    if (href) {
      return (
        <Link data-testid="link" href={href}>
          {children}
        </Link>
      );
    }

    return children;
  };

  const getButtonColor = () => {
    if (loading) return theme.colors.disabled_color;

    if (color) return theme.colors[color];

    return theme.colors.primary;
  };

  return render(
    <Container id={id} data-testid="add-button">
      <LoadingWrapper loading={!!loading} overContainer size={16} />
      <PlusCircle
        data-cy={dataCy}
        onClick={onClick}
        cursor="pointer"
        size={32}
        weight="fill"
        color={getButtonColor()}
        data-testid="plus-circle"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
`;

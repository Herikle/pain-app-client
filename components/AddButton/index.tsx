import { LoadingWrapper } from "@components/LoadingWrapper";
import { PlusCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import Link from "next/link";
import styled from "styled-components";

type AddButtonProps = {
  onClick?: () => void;
  href?: string;
  loading?: boolean;
};

export const AddButton = ({ onClick, href, loading }: AddButtonProps) => {
  const render = (children) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }

    return children;
  };

  return render(
    <Container>
      <LoadingWrapper loading={!!loading} overContainer size={16} />
      <PlusCircle
        onClick={onClick}
        cursor="pointer"
        size={32}
        weight="fill"
        color={!!loading ? theme.colors.disabled_color : theme.colors.primary}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
`;

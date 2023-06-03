import { Text } from "@components/Text";
import { PlusCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import Link from "next/link";
import styled from "styled-components";

type AddButtonProps = {
  onClick?: () => void;
  href?: string;
};

export const AddButton = ({ onClick, href }: AddButtonProps) => {
  const render = (children) => {
    if (href) {
      <Link href={href}>{children}</Link>;
    }

    return children;
  };

  return render(
    <PlusCircle
      cursor="pointer"
      size={32}
      weight="fill"
      color={theme.colors.primary}
    />
  );
};

const Container = styled.div``;

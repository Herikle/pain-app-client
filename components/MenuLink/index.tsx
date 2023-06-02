import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "design-components/Flex";
import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";
import { Icon } from "@phosphor-icons/react";
import { theme } from "@styles/theme";

type Props = {
  label: string;
  PhosphorIcon?: Icon;
  iconPath?: string;
  description?: string;
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  notAllowed?: boolean;
};

export const MenuLink = ({
  label,
  PhosphorIcon,
  iconPath,
  description,
  fullWidth,
  href,
  onClick,
  disabled = false,
  notAllowed = false,
}: Props) => {
  const render = (children) => {
    if (href && !notAllowed) {
      return (
        <Link
          href={href}
          style={{
            width: fullWidth ? "100%" : "auto",
          }}
        >
          {children}
        </Link>
      );
    }

    return children;
  };

  return render(
    <Container onClick={onClick} $disabled={disabled} $notAllowed={notAllowed}>
      {PhosphorIcon ? (
        <PhosphorIcon size={36} color={theme.colors.pure_white} />
      ) : (
        <Image src={iconPath} alt="Chat GPT icon" width="36" height="36" />
      )}
      <DescriptionContainer>
        {description && <Text color="pure_white">{description}</Text>}
        <Text variant="body2Bold" color="pure_white">
          {label}
        </Text>
      </DescriptionContainer>
    </Container>
  );
};

const DescriptionContainer = styled(FlexColumn)`
  gap: 0;
`;

type ContainerProps = {
  $disabled: boolean;
  $notAllowed: boolean;
};

const Container = styled(FlexRow)<ContainerProps>`
  width: 100%;
  justify-content: flex-start;
  cursor: pointer;
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
    `}

  ${({ $notAllowed }) =>
    $notAllowed &&
    css`
      cursor: not-allowed;
    `}
`;

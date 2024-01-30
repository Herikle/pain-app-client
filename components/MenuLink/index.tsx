import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";
import { Icon } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { CSSProperties } from "react";
import { media, useMatchMediaUp } from "@styles/media-query";
import { transparentize } from "polished";

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
  cursor?: CSSProperties["cursor"];
};

export const MenuLink = ({
  label,
  PhosphorIcon,
  iconPath,
  description,
  fullWidth,
  href,
  onClick,
  cursor,
  disabled = false,
  notAllowed = false,
}: Props) => {
  const isTabletUp = useMatchMediaUp("tablet");

  const render = (children) => {
    if (href && !notAllowed) {
      return (
        <Link
          data-testid="menu-link-link"
          href={href}
          style={{
            width: fullWidth && !isTabletUp ? "100%" : "auto",
            flex: fullWidth ? 1 : "unset",
          }}
        >
          {children}
        </Link>
      );
    }

    return children;
  };

  return render(
    <Container
      data-testid="menu-link-container"
      onClick={onClick}
      $fullWidth={!!fullWidth}
      $disabled={disabled}
      $notAllowed={notAllowed}
      style={{
        cursor: cursor,
      }}
    >
      {PhosphorIcon ? (
        <PhosphorIcon
          data-testid="menu-link-phosporicon"
          size={36}
          color={theme.colors.pure_white}
        />
      ) : (
        iconPath && (
          <Image src={iconPath} alt="MenuLinkIcon" width="36" height="36" />
        )
      )}
      <DescriptionContainer>
        {!isTabletUp && (
          <>
            {description && (
              <Text
                color="pure_white"
                textElipsis
                maxWidth="140px"
                minWidth="140px"
              >
                {description}
              </Text>
            )}
          </>
        )}
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
  $fullWidth: boolean;
};

const Container = styled(FlexRow)<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  flex: 1;
  ${({ $disabled }) =>
    $disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          ${media.up.tablet`
          background-color: ${transparentize(
            0.7,
            theme.colors.pure_black
          )};        
      `}
        `}

  ${({ $notAllowed }) =>
    $notAllowed &&
    css`
      cursor: not-allowed;
    `}    
    

    ${({ $fullWidth }) => media.up.tablet`
      flex-direction: column;
      width: ${$fullWidth ? "100%" : "fit-content"};
      justify-content: center;     
      border-radius: 8px;
      padding: 0.5rem;      
    `}    

    ${media.up.mobileM`        
    `}
`;

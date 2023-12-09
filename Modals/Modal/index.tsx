import { Portal } from "@components/Portal";
import { X } from "@phosphor-icons/react";
import { media } from "@styles/media-query";
import { LightScrollBar, theme } from "@styles/theme";
import styled, { css } from "styled-components";

type Props = {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
  removeOverlay?: boolean;
  removePadding?: boolean;
  fullScreenOnMobile?: boolean;
  height?: string;
};

export const Modal = ({
  children,
  onClose,
  open,
  hasCloseButton,
  removeOverlay = false,
  removePadding = false,
  fullScreenOnMobile = false,
  height,
}: Props) => {
  const isOpen = open ?? true;

  return (
    <Portal>
      {isOpen && (
        <>
          {!removeOverlay && <ModalOverlay onClick={onClose} />}
          <Container
            $removePadding={removePadding}
            $fullScreenOnMobile={fullScreenOnMobile}
            $height={height}
          >
            {children}
            {hasCloseButton && (
              <XContainer>
                <X
                  size={24}
                  color={theme.colors.font_color}
                  onClick={onClose}
                  cursor="pointer"
                />
              </XContainer>
            )}
          </Container>
        </>
      )}
    </Portal>
  );
};

const XContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  ${media.up.mobileL`
    top: 0.5rem;
    right: 0.5rem;
  `}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.pure_black};
  opacity: 0.5;
`;

type ContainerProps = {
  $removePadding: boolean;
  $fullScreenOnMobile: boolean;
  $height?: string;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: ${theme.colors.pure_white};
  padding: ${({ $removePadding }) => ($removePadding ? 0 : "2rem")};
  max-height: 95vh;
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
  ${({ $fullScreenOnMobile }) =>
    $fullScreenOnMobile &&
    css`
      ${media.up.tablet`
      top: 0;
      left: 0;
      transform: none;
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      `}
    `}
`;

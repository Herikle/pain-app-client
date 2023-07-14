import { Portal } from "@components/Portal";
import { X } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
};

export const Modal = ({ children, onClose, open, hasCloseButton }: Props) => {
  const isOpen = open ?? true;

  return (
    <Portal>
      {isOpen && (
        <>
          <ModalOverlay onClick={onClose} />
          <Container>
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

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: ${theme.colors.pure_white};
  padding: 2rem;
`;

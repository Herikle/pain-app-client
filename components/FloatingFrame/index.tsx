import { Portal } from "@components/Portal";
import { theme } from "@styles/theme";
import { useEffect } from "react";
import styled from "styled-components";

type FloatingFrameProps = {
  children: React.ReactNode;
  anchor: HTMLElement | null;
  open: boolean;
};

export const FloatingFrame = ({
  children,
  anchor,
  open,
}: FloatingFrameProps) => {
  useEffect(() => {
    const onScroll = () => {
      console.log("scroll");
    };

    if (open) {
      document.addEventListener("scroll", onScroll);
    }

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  if (!anchor) return null;

  const { top, left, height } = anchor.getBoundingClientRect();

  if (!open) return null;

  return (
    <Portal>
      <Container
        style={{
          top: `${top + height}px`,
          left: `${left}px`,
        }}
      >
        {children}
      </Container>
    </Portal>
  );
};

const Container = styled.div`
  position: fixed;
  min-width: 100px;
  min-height: 100px;
  background-color: white;
  border-radius: 4px;
  box-shadow: ${theme.box_shadow.lite};
  padding: 0.5rem;
`;

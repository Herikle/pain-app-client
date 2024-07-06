import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { Popper } from "@mui/material";
import { theme } from "@styles/theme";
import { useDetectClickOutside } from "@utils/hooks/useDetectClickOutside";
import React, { useRef } from "react";
import styled from "styled-components";

type MenuItem = {
  id: string;
  label: React.ReactNode;
  onClick: () => void;
};

type Props = {
  anchorEl: Element | null;
  options: MenuItem[];
  open: boolean;
  container?: Element | null;
  onClose?: () => void;
};

export const FloatingMenu = ({
  anchorEl,
  open,
  options,
  onClose,
  container,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useDetectClickOutside({
    element: containerRef.current,
    onClickOutSide: () => {
      onClose && onClose();
    },
    enabled: open,
  });

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      container={container}
      placement="right-start"
      style={
        {
          // zIndex: 1000,
        }
      }
    >
      <Container gap={0} onClick={onClose} ref={containerRef}>
        {options.map((option) => (
          <Option key={option.id} onClick={option.onClick}>
            {typeof option.label === "string" ? (
              <Text variant="body2">{option.label}</Text>
            ) : (
              option.label
            )}
          </Option>
        ))}
      </Container>
    </Popper>
  );
};

const Option = styled.div`
  cursor: pointer;

  padding: 0.7rem 1.2rem;

  background-color: ${theme.colors.pure_white};

  &:hover {
    background-color: ${theme.colors.hover_state};
  }
`;

const Container = styled(FlexColumn)`
  box-shadow: ${theme.box_shadow.medium};
`;

import { theme } from "@styles/theme";
import { useMemo } from "react";
import { PlacesType, Tooltip } from "react-tooltip";
import styled from "styled-components";
import { v4 } from "uuid";

type TooltipContentProps = {
  children: React.ReactNode;
  tooltip: string;
  place?: PlacesType;
  minWidth?: string;
  bgColor?: string;
};

export const TooltipContent = ({
  children,
  tooltip,
  place,
  minWidth,
  bgColor,
}: TooltipContentProps) => {
  const id = useMemo(() => v4(), []);

  return (
    <Container data-tooltip-id={id}>
      {children}
      <Tooltip
        style={{
          minWidth: minWidth ? minWidth : "auto",
          backgroundColor: bgColor ? bgColor : "#222",
          zIndex: 1,
        }}
        anchorSelect={`[data-tooltip-id="${id}"]`}
        place={place}
      >
        {tooltip}
      </Tooltip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

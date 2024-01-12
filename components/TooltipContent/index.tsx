import { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { v4 } from "uuid";

type TooltipContentProps = {
  children: React.ReactNode;
  tooltip: string;
};

export const TooltipContent = ({ children, tooltip }: TooltipContentProps) => {
  const id = useMemo(() => v4(), []);

  return (
    <Container data-tooltip-id={id}>
      {children}
      <Tooltip anchorSelect={`[data-tooltip-id="${id}"]`}>{tooltip}</Tooltip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

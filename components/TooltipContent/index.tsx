import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import { useMemo } from "react";
import { PlacesType, Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";
import { v4 } from "uuid";

type TooltipContentProps = {
  children: React.ReactNode;
  tooltip: string;
  place?: PlacesType;
  minWidth?: string;
  bgColor?: string;
  noArrow?: boolean;
  theme?: "light" | "dark";
};

export const TooltipContent = ({
  children,
  tooltip,
  place,
  minWidth,
  bgColor,
  noArrow,
  theme: themeProps = "dark",
}: TooltipContentProps) => {
  const id = useMemo(() => v4(), []);

  const getBgColor = () => {
    if (bgColor) return bgColor;

    if (themeProps === "light") {
      return theme.colors.pure_white;
    }

    return "#222";
  };

  return (
    <Container
      data-tooltip-id={id}
      $theme={themeProps}
      data-testid="tooltip-content"
    >
      {children}
      <Tooltip
        style={{
          minWidth: minWidth ? minWidth : "auto",
          backgroundColor: getBgColor(),
          zIndex: 1,
        }}
        anchorSelect={`[data-tooltip-id="${id}"]`}
        noArrow={noArrow}
        place={place}
      >
        <Text
          variant="body2"
          color={themeProps === "light" ? "font_color" : "pure_white"}
          data-testid="tooltip-content-text"
        >
          {tooltip}
        </Text>
      </Tooltip>
    </Container>
  );
};

type ContainerProps = {
  $theme: "light" | "dark";
};

const Container = styled.div<ContainerProps>`
  display: flex;

  ${({ $theme }) =>
    $theme === "light" &&
    css`
      & .react-tooltip {
        background-color: ${theme.colors.pure_white};
        border: 1px solid ${theme.colors.font_color};
        opacity: 1 !important;
      }
    `}
`;

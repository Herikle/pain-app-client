import { theme } from "@styles/theme";
import { Oval } from "react-loader-spinner";
import styled, { CSSProperties, css } from "styled-components";

type LoadingWrapperProps = {
  loading: boolean;
  children?: React.ReactNode;
  fullScreen?: boolean;
  overContainer?: boolean;
  size?: number;
  style?: CSSProperties;
};

export const LoadingWrapper = ({
  loading,
  children,
  fullScreen,
  overContainer,
  size = 32,
  style,
}: LoadingWrapperProps) => {
  return loading ? (
    <>
      {overContainer && <Overlay data-testid="loading-wrapper-overlay" />}
      <Container
        style={style}
        $fullScreen={fullScreen}
        $overContainer={overContainer}
        data-testid="loading-wrapper"
      >
        <Oval
          color={theme.colors.primary}
          strokeWidth={5}
          secondaryColor={theme.colors.medium_grey}
          width={size}
        />
      </Container>
    </>
  ) : (
    <>{children ? children : null}</>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type Props = {
  $fullScreen?: boolean;
  $overContainer?: boolean;
};

const Container = styled.div<Props>`
  width: fit-content;
  height: fit-content;
  margin: auto;
  ${({ $fullScreen, $overContainer }) =>
    ($fullScreen || $overContainer) &&
    css`
      position: ${$fullScreen ? "fixed" : "absolute"};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
`;

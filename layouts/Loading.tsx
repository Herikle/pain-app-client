import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

export const LoadingPage = () => {
  return (
    <Container>
      <Oval
        color={theme.colors.primary}
        secondaryColor={theme.colors.secondary_color}
        height={100}
        width={100}
        strokeWidth={5}
      />
      <Text variant="body1Bold" color="primary">
        We are preparing your experience, please wait...
      </Text>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.pure_white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { styled } from "styled-components";

export const Login = () => {
  return (
    <Container>
      <Text variant="h1" align="center">
        Welcome back!
      </Text>
      <TextField label="Your e-mail" type="email" name="email" />
      <TextField label="Your password" type="password" name="password" />
      <RememberMe>
        <Checkbox />
        <Text variant="body2">Remember your info</Text>
      </RememberMe>
      <Buttons>
        <Button fullWidth>Log in</Button>
        <Text variant="body2Bold" color="font_color">
          or
        </Text>
        <Button fullWidth color="font_color">
          Continue with Google
        </Button>
      </Buttons>
    </Container>
  );
};

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

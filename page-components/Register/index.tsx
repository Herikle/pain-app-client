import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { styled } from "styled-components";

export const Register = () => {
  return (
    <Container>
      <Text variant="h1" align="center">
        Create an account
      </Text>
      <TextField label="Your name" name="name" id="register-name" />
      <TextField
        label="Your e-mail"
        type="email"
        name="email"
        id="register-email"
      />
      <TextField
        label="Your password"
        type="password"
        name="password"
        id="register-password"
      />
      <TextField
        label="Confirm your password"
        type="password"
        name="password-confirm"
      />
      <Checkbox label="I agree to all Terms and Privacy Policy" />
      <Buttons>
        <Button fullWidth>Register</Button>
        <Text variant="body2Bold" color="font_color">
          or
        </Text>
        <Button fullWidth color="font_color">
          Sign up with Google
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

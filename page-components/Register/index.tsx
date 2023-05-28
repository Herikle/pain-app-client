import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
// import { GoogleLogo } from "@phosphor-icons/react";
// import { FlexRow } from "design-components/Flex";
import styled from "styled-components";
import { getPayloadFromSubmitForm } from "utils/helpers/data";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  terms: boolean;
};

type SubmitFormPayload = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  terms: string;
};

type Props = {
  onSubmit: (payload: RegisterPayload) => void;
};

export const Register = ({ onSubmit }: Props) => {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = getPayloadFromSubmitForm<SubmitFormPayload>(e);

    onSubmit({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      password_confirm: payload.password_confirm,
      terms: payload.terms === "on",
    });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Container>
        <Text variant="h1" align="center">
          Create an account
        </Text>
        <TextField label="Your name" name="name" id="register-name" required />
        <TextField
          label="Your e-mail"
          type="email"
          name="email"
          id="register-email"
          required
        />
        <TextField
          label="Your password"
          type="password"
          name="password"
          id="register-password"
          required
        />
        <TextField
          label="Confirm your password"
          type="password"
          name="password_confirm"
          required
        />
        <Checkbox
          label="I agree to all Terms and Privacy Policy"
          name="terms"
          required
        />
        <Buttons>
          <Button fullWidth>Register</Button>
          {/* <Text variant="body2Bold" color="font_color">
            or
          </Text>
          <Button type="submit" fullWidth color="font_color">
            <FlexRow>
              <GoogleLogo size={22} weight="bold" />
              Sign up with Google
            </FlexRow>
          </Button> */}
        </Buttons>
      </Container>
    </form>
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

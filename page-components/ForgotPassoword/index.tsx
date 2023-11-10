import styled from "styled-components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { RoutesPath } from "utils/routes";
import Link from "next/link";
import { media } from "@styles/media-query";
import { FlexRow } from "@design-components/Flex";
import { GoogleLogo } from "@phosphor-icons/react";
import { useGetGoogleOAuthUrl } from "@queries/auth/useAuth";

const ForgotPasswordSchema = z.object({
  email: z.string().email().nonempty(),
});

export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;

type Props = {
  onSubmit: (payload: ForgotPasswordPayload) => void;
  defaultEmail?: string;
  loading?: boolean;
};

export const ForgotPassword = ({ onSubmit, defaultEmail, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const onSubmitForm = (payload: ForgotPasswordPayload) => {
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Container>
        <Text variant="h1" align="center">
          Reset your password
        </Text>
        <Text align="left" variant="body2">
          {"Forgot your password? Dont't worry."}
          <br />
          <br />
          {"Enter your e-mail and we'll send you a link."}
        </Text>
        <TextField
          type="email"
          label="Your e-mail"
          required
          {...register("email")}
          error={errors.email?.message}
        />

        <Buttons>
          <Button fullWidth type="submit" loading={loading}>
            Proceed
          </Button>
          <Link href={RoutesPath.login} style={{ width: "100%" }}>
            <Button
              variant="outlined"
              type="button"
              fullWidth
              color="pure_white"
              textColor="pure_black"
              borderColor="pure_black"
            >
              Return to login
            </Button>
          </Link>
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
  ${media.up.mobileM`
    padding-inline: 1.5rem;   
  `}
`;

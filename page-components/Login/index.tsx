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

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string(),
  remember: z.boolean(),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

type Props = {
  onSubmit: (payload: LoginPayload) => void;
  loading?: boolean;
};

export const Login = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  });

  const getGoogleOAuthUrl = useGetGoogleOAuthUrl();

  const onClickGoogleLogin = async () => {
    const data = await getGoogleOAuthUrl.mutateAsync();

    const url_redirect = data.url;

    window.location.replace(url_redirect);
  };

  const onSubmitForm = (payload: LoginPayload) => {
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Container>
        <Text variant="h1" align="center">
          Welcome back!
        </Text>
        <Text align="center">
          Don&apos;t have an account yet?{" "}
          <Link href={RoutesPath.register}>
            <Text decoration="underline">Register here </Text>
          </Link>
        </Text>
        <TextField
          label="Your e-mail"
          {...register("email")}
          error={errors.email?.message}
        />
        <TextField
          label="Your password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Checkbox label="Remember me" {...register("remember")} />
        <Link href={RoutesPath.forgot_password}>
          <Text
            variant="body2"
            decoration="underline"
            align="center"
            color="primary"
          >
            Forgot your password?
          </Text>
        </Link>
        <Buttons>
          <Button fullWidth type="submit" loading={loading}>
            Log in
          </Button>
          <Text variant="body2" color="font_color">
            or
          </Text>
          <Button
            fullWidth
            color="font_color"
            onClick={onClickGoogleLogin}
            loading={getGoogleOAuthUrl.isLoading}
          >
            <FlexRow>
              <GoogleLogo size={22} weight="bold" />
              Continue with Google
            </FlexRow>
          </Button>
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

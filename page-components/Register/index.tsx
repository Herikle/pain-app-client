import styled from "styled-components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import Link from "next/link";
import { RoutesPath } from "utils/routes";
import { media } from "@styles/media-query";
import { FlexRow } from "@design-components/Flex";
import { GoogleLogo } from "@phosphor-icons/react";
import { useGetGoogleOAuthUrl } from "@queries/auth/useAuth";

const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required to register")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    password_confirm: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    terms: z.literal<boolean>(true, {
      errorMap: () => ({
        message: "Terms and Privacy Policy must be accepted",
      }),
    }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"],
  });

export type RegisterPayload = z.infer<typeof RegisterSchema>;

type Props = {
  onSubmit: (payload: RegisterPayload) => void;
  loading?: boolean;
};

export const Register = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
  });

  const getGoogleOAuthUrl = useGetGoogleOAuthUrl();

  const onClickGoogleLogin = async () => {
    const data = await getGoogleOAuthUrl.mutateAsync();

    const url_redirect = data.url;

    window.location.replace(url_redirect);
  };

  const onSubmitForm = (payload: RegisterPayload) => {
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Container>
        <Text variant="h1" align="center">
          Create an account
        </Text>
        <Text align="center">
          If you already have an account,
          <Link href={RoutesPath.login}>
            <Text decoration="underline"> login here.</Text>
          </Link>
        </Text>
        <TextField
          label="Your name"
          {...register("name")}
          error={errors.name?.message}
        />
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
        <TextField
          label="Confirm your password"
          type="password"
          {...register("password_confirm")}
          error={errors.password_confirm?.message}
        />
        <Checkbox
          label={
            <>
              I agree to all{" "}
              <a
                href="https://docs.google.com/document/d/1nbNcmvYXXyf3UprAsH33pDF-iKkXFrKp5aalJBugwVY/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "underline",
                }}
              >
                Terms and Privacy Policy
              </a>
            </>
          }
          {...register("terms")}
          error={errors.terms?.message}
        />
        <Buttons>
          <Button loading={loading} fullWidth>
            Register
          </Button>
          <Text variant="body2Bold" color="font_color">
            or
          </Text>
          <Button
            type="submit"
            fullWidth
            color="font_color"
            onClick={onClickGoogleLogin}
            loading={getGoogleOAuthUrl.isLoading}
          >
            <FlexRow>
              <GoogleLogo size={22} weight="bold" />
              Sign up with Google
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

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { RoutesPath } from "utils/routes";
import Link from "next/link";
import { media } from "@styles/media-query";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;

type Props = {
  onSubmit: (payload: ResetPasswordPayload) => void;
  loading?: boolean;
};

export const ResetPasswordForm = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmitForm = (payload: ResetPasswordPayload) => {
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Container>
        <Text variant="h1" align="center">
          Create a new password
        </Text>
        <Text align="left" variant="body2">
          Choose a strong, new password for you.
        </Text>
        <TextField
          type="password"
          label="Your new password"
          {...register("password")}
          error={errors.password?.message}
        />
        <TextField
          type="password"
          label="Confirm your new password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Buttons>
          <Button fullWidth type="submit" loading={loading}>
            Proceed
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

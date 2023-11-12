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
import { PasswordInput } from "@page-components/PasswordField";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8).nonempty(),
    password_confirm: z.string().min(8).nonempty(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"],
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
        <PasswordInput
          customLabel="Your new password"
          register={register("password")}
          error={errors.password?.message}
        />
    <PasswordInput
          customLabel="Confirm your new password"
          register={register("password_confirm")}
          error={errors.password_confirm?.message}
        />
        <TextField
          type="password"
          label="Confirm your new password"
          required
          {...register("password_confirm")}
          error={errors.password_confirm?.message}
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

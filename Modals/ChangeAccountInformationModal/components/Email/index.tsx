import React from "react";
import styled from "styled-components";
import { z, zodResolver, useForm } from "utils/helpers/form-validation";

import { BackButton } from "@components/BackButton";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { useAuth } from "@utils/hooks/useAuth";

const changeEmailSchema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "E-mails do not match",
    path: ["confirmEmail"],
  });

type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;

type EmailProps = {
  onBack: () => void;
};

export const Email = ({ onBack }: EmailProps) => {
  const { user } = useAuth();

  const { register, handleSubmit, formState } = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
  });

  const { errors } = formState;

  const onSubmit = (data: z.infer<typeof changeEmailSchema>) => {
    console.log(data);
  };

  return (
    <Container>
      <BackButton onClick={onBack} text="Return to Account settings" />
      <FlexColumn mt={2} gap={1.5}>
        <Text variant="h1">Change your e-mail</Text>
        <Text variant="body1">You actual e-mail</Text>
        <Text variant="body1" color="text_switched">
          {user?.email}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexColumn gap={1.5}>
            <TextField
              label="Enter the e-mail you want to use:"
              {...register("email")}
              error={errors.email?.message}
            />
            <TextField
              label="Before we proceed, confirm your new e-mail:"
              {...register("confirmEmail")}
              error={errors.confirmEmail?.message}
            />
            <Button>Proceed</Button>
          </FlexColumn>
        </form>
      </FlexColumn>
    </Container>
  );
};

const Container = styled(FlexColumn)`
  align-items: flex-start;
  width: 100%;
`;

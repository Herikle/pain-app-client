import React from "react";
import { z, zodResolver, useForm } from "@utils/helpers/form-validation";

import { BackButton } from "@components/BackButton";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { useAuth } from "@utils/hooks/useAuth";
import { MainFormContainer } from "@Modals/ChangeAccountInformationModal/components/shared-styles";
import { useRequestEmailChange } from "@queries/account/useAccount";

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
  onSuccess: (newEmail: string) => void;
};

export const UpdateEmailForm = ({ onBack, onSuccess }: EmailProps) => {
  const { user } = useAuth();

  const { register, handleSubmit, formState } = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
  });

  const requestEmailChange = useRequestEmailChange();

  const { errors } = formState;

  const onSubmit = async (data: z.infer<typeof changeEmailSchema>) => {
    await requestEmailChange.mutateAsync({
      body: {
        newEmail: data.email,
      },
    });
    onSuccess(data.email);
  };

  return (
    <MainFormContainer>
      <BackButton onClick={onBack} text="Return to Account settings" />
      <FlexColumn mt={2} gap={1.5} width="100%">
        <Text variant="h1">Change your e-mail</Text>
        <Text variant="body1">You actual e-mail</Text>
        <Text variant="body1" color="text_switched">
          {user?.email}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} data-cy="update-email-form">
          <FlexColumn gap={1.5}>
            <TextField
              label="Enter the e-mail you want to use:"
              labelOptions={{ fontWeight: "normal" }}
              {...register("email")}
              error={errors.email?.message}
            />
            <TextField
              label="Before we proceed, confirm your new e-mail:"
              labelOptions={{ fontWeight: "normal" }}
              {...register("confirmEmail")}
              error={errors.confirmEmail?.message}
            />
            <Button loading={requestEmailChange.isLoading}>Proceed</Button>
          </FlexColumn>
        </form>
      </FlexColumn>
    </MainFormContainer>
  );
};

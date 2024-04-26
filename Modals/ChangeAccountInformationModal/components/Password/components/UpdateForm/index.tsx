import { FlexColumn, FlexRow } from "@design-components/Flex";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordAccount } from "@queries/account/useAccount";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { TextField } from "@components/TextField";
import { BackButton } from "@components/BackButton";
import { MainFormContainer } from "@Modals/ChangeAccountInformationModal/components/shared-styles";

const PasswordSettingsSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirm_password: z
      .string()
      .min(1, "Confirm password is required")
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine(
    (data) => {
      return data.new_password === data.confirm_password;
    },
    {
      message: "Your passwords doesn't coincide.",
      path: ["confirm_password"],
    }
  );

type PasswordSettingsFormType = z.infer<typeof PasswordSettingsSchema>;

export type PasswordProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export const UpdatePasswordForm = ({ onBack, onSuccess }: PasswordProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<PasswordSettingsFormType>({
    resolver: zodResolver(PasswordSettingsSchema),
  });

  const updatePassword = useUpdatePasswordAccount();

  const isSomeEmpty =
    !watch("current_password") ||
    !watch("new_password") ||
    !watch("confirm_password");

  const onSubmit = async (data: PasswordSettingsFormType) => {
    await updatePassword.mutateAsync({
      body: data,
    });
    onSuccess();
    reset();
  };

  return (
    <MainFormContainer>
      <BackButton onClick={onBack} text="Return to Account settings" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <FlexColumn mt={2} gap={2} width="100%">
          <Text variant="h1">Change your password</Text>

          <TextField
            type="password"
            label="Your actual password"
            labelOptions={{
              fontWeight: "normal",
            }}
            {...register("current_password")}
            error={errors.current_password?.message}
          />

          <TextField
            type="password"
            label={
              <Text variant="body2">
                Enter the <strong>new</strong> password you want to use:
              </Text>
            }
            {...register("new_password")}
            error={errors.new_password?.message}
          />

          <TextField
            type="password"
            label={
              <Text variant="body2">
                Please, enter again your <strong>new</strong> password:
              </Text>
            }
            {...register("confirm_password")}
            error={errors.confirm_password?.message}
          />

          <Button
            disabled={isSomeEmpty}
            loading={updatePassword.isLoading}
            fullWidth
          >
            Proceed
          </Button>
        </FlexColumn>
      </form>
    </MainFormContainer>
  );
};

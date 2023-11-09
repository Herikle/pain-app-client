import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Modal } from "../Modal";
import { useChangePasswordModalState } from "./hooks";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordAccount } from "@queries/account/useAccount";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";

const PasswordSettingsSchema = z
  .object({
    current_password: z.string().nonempty("Current password is required"),
    new_password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirm_password: z
      .string()
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

export type ChildPropsChangePasswordModal = {
  onClose: () => void;
};

const Child = ({ onClose }: ChildPropsChangePasswordModal) => {
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

  const isAllEmpty =
    !watch("current_password") ||
    !watch("new_password") ||
    !watch("confirm_password");

  const onSubmit = async (data: PasswordSettingsFormType) => {
    await updatePassword.mutateAsync({
      body: data,
    });
    reset();
  };

  return (
    <Modal onClose={onClose} hasCloseButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormContainer>
            <Text variant="h1">Change your password</Text>
            <Grid container spacing={4}>
              <Grid xs={12}>
                <TextField
                  type="password"
                  label="Enter your actual password"
                  required
                  {...register("current_password")}
                  error={errors.current_password?.message}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  type="password"
                  label="Enter your new password"
                  required
                  {...register("new_password")}
                  error={errors.new_password?.message}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  type="password"
                  label="Confirm your new password"
                  required
                  {...register("confirm_password")}
                  error={errors.confirm_password?.message}
                />
              </Grid>
            </Grid>
            <Button
              disabled={isAllEmpty}
              loading={updatePassword.isLoading}
              width="140px"
            >
              Save changes
            </Button>
          </FormContainer>
        </Container>
      </form>
    </Modal>
  );
};

const FormContainer = styled(FlexColumn)`
  width: 400px;
  justify-content: flex-start;
  gap: 2rem;
`;

const Container = styled(FlexColumn)`
  align-items: flex-start;
  width: 700px;
`;

export const ChangePasswordModal = () => {
  const [isOpen, setIsOpen] = useChangePasswordModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};

import { Text } from "@components/Text";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { Button } from "@components/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordAccount } from "@queries/account/useAccount";

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

export const PasswordSettingsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordSettingsFormType>({
    resolver: zodResolver(PasswordSettingsSchema),
  });

  const updatePassword = useUpdatePasswordAccount();

  const onSubmit = async (data: PasswordSettingsFormType) => {
    await updatePassword.mutateAsync({
      body: data,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Text variant="h1">Password settings</Text>
        <Grid container spacing={4}>
          <Grid xs={4}>
            <TextField
              type="password"
              label="Type your current password"
              required
              {...register("current_password")}
              error={errors.current_password?.message}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              type="password"
              label="Type your new password"
              required
              {...register("new_password")}
              error={errors.new_password?.message}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              type="password"
              label="Confirm your new password"
              required
              {...register("confirm_password")}
              error={errors.confirm_password?.message}
            />
          </Grid>
        </Grid>
        <Button loading={updatePassword.isLoading} width="340px">
          Save changes
        </Button>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 2rem;
`;

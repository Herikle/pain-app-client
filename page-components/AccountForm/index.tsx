import { Text } from "@components/Text";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { Button } from "@components/Button";
import { useAuth } from "@utils/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateAccount } from "@queries/account/useAccount";
import { useFormPrompt } from "@utils/hooks/useFormPrompt";
import { UnsavedChangesDialog } from "@components/UnsavedChangesDialog";
import { media } from "@styles/media-query";

const accountFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type AccountFormType = z.infer<typeof accountFormSchema>;

export const AccountForm = () => {
  const { user } = useAuth();

  const updateAccount = useUpdateAccount();

  const { register, handleSubmit, reset, formState } = useForm<AccountFormType>(
    {
      resolver: zodResolver(accountFormSchema),
      defaultValues: {
        name: user?.name,
      },
    }
  );

  const { isDirty, errors } = formState;

  useFormPrompt(isDirty);

  const onSubmit = async (data: AccountFormType) => {
    await updateAccount.mutateAsync({
      body: data,
    });
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <UnsavedChangesDialog shouldConfirmLeave={isDirty} />
      <Container>
        <TextField
          fullWidth
          label="Display name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Button fullWidth loading={updateAccount.isLoading} disabled={!isDirty}>
          Save display name
        </Button>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 2rem;
  justify-content: flex-start;
  width: 100%;
`;

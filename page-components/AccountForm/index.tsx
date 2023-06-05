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

const accountFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
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

  const { isDirty } = formState;

  const onSubmit = async (data: AccountFormType) => {
    await updateAccount.mutateAsync({
      body: data,
    });
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Text variant="h1">Account info</Text>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <TextField label="Display name" required {...register("name")} />
          </Grid>
        </Grid>
        <Button
          width="340px"
          loading={updateAccount.isLoading}
          disabled={!isDirty}
        >
          Save changes
        </Button>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 2rem;
`;

import { Text } from "@components/Text";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { Button } from "@components/Button";

export const PasswordSettingsForm = () => {
  return (
    <Container>
      <Text variant="h1">Password settings</Text>
      <form>
        <Grid container spacing={4}>
          <Grid xs={4}>
            <TextField type="password" label="Type your current password" />
          </Grid>
          <Grid xs={4}>
            <TextField type="password" label="Type your new password" />
          </Grid>
          <Grid xs={4}>
            <TextField type="password" label="Confirm your new password" />
          </Grid>
        </Grid>
      </form>
      <Button width="340px">Save changes</Button>
    </Container>
  );
};

const Container = styled(FlexColumn)`
  gap: 2rem;
`;

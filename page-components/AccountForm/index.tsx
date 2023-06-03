import { Text } from "@components/Text";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import { Button } from "@components/Button";

export const AccountForm = () => {
  return (
    <Container>
      <Text variant="h1">Account info</Text>
      <form>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <TextField label="Display name" />
          </Grid>
          <Grid xs={6}>
            <TextField label="Type of account" />
          </Grid>
          <Grid xs={6}>
            <TextField label="E-mail" />
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

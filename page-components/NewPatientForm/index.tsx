import { Button } from "@components/Button";
import { TextArea } from "@components/TextArea";
import { TextField } from "@components/TextField";
import { FlexColumn } from "@design-components/Flex";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";

export const NewPatientForm = () => {
  return (
    <form>
      <Container>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <TextField label="Name" placeholder="Choose a name" />
          </Grid>
          <Grid xs={6}>
            <TextField label="Date of birth" placeholder="DD/MM/YYYY" />
          </Grid>
          <Grid xs={12}>
            <TextArea
              label="About the patient"
              placeholder="Write something about that patient..."
              minRows={7}
              maxRows={14}
            />
          </Grid>
        </Grid>
        <Button width="160px">Add patient</Button>
      </Container>
    </form>
  );
};

const Container = styled(FlexColumn)`
  gap: 1rem;
`;

import { FlexColumn, FlexRow } from "@design-components/Flex";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { TextArea } from "@components/TextArea";
import { Text } from "@components/Text";
import { Radio } from "@components/Radio";

export const TrackDetailsPage = () => {
  return (
    <Container gap={4} align="flex-start">
      <Grid container spacing={4} width="50%">
        <Grid xs={12}>
          <TextField label="Name" placeholder="Arm fracture" />
        </Grid>
        <Grid xs={12}>
          <FlexColumn gap={2} align="flex-start">
            <Text variant="body2Bold">Type of pain</Text>
            <FlexRow gap={6}>
              <Radio
                label="Psychological"
                name="type_of_pain"
                value="psychological"
              />
              <Radio
                label="Physical"
                name="type_of_pain"
                value="physical"
                defaultChecked
              />
            </FlexRow>
          </FlexColumn>
        </Grid>
      </Grid>
      <FlexColumn width="50%" gap={4} justify="flex-start">
        <TextArea label="Comment" minRows={12} maxRows={12} />
      </FlexColumn>
    </Container>
  );
};

const Container = styled(FlexRow)``;

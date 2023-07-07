import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@components/TextField";
import { Radio } from "@components/Radio";
import { TextArea } from "@components/TextArea";
import { Select } from "@components/Select";

export const SegmentPage = () => {
  return (
    <Container gap={4}>
      <Grid container spacing={4} width="50%">
        <Grid xs={12}>
          <TextField label="Segment Name" />
        </Grid>
        <Grid xs={4}>
          <TextField label="Between" />
        </Grid>
        <Grid xs={4}>
          <TextField label="And" />
        </Grid>
        <Grid xs={4}>
          <Select
            id="select-time-unit"
            label="Time Unit"
            options={[
              {
                label: "Minutes",
                id: "minutes",
              },
              {
                label: "Hours",
                id: "hours",
              },
              {
                label: "Days",
                id: "days",
              },
            ]}
            getLabel={(option) => option.label}
            getValue={(option) => option.id}
            value="minutes"
            onChange={() => {}}
          />
        </Grid>
        <Grid xs={12}>
          <TextField label="Date and time of start" type="datetime-local" />
        </Grid>
        <Grid xs={12}>
          <Select
            id="select-estimative-type"
            label="Estimative type"
            options={[
              {
                label: "Reported by patient",
                id: "reported",
              },
              {
                label: "Measured by device",
                id: "device",
              },
              {
                label: "Inferred by algorithm",
                id: "algorithm",
              },
            ]}
            getLabel={(option) => option.label}
            getValue={(option) => option.id}
            value="reported"
            onChange={() => {}}
          />
        </Grid>
      </Grid>
      <FlexColumn width="50%" gap={4} justify="flex-start">
        <RadioContainer>
          <Radio label="Acute" name="pain_cause" value="acute" />
          <Radio label="Chronic" name="pain_cause" value="chronic" />
        </RadioContainer>
        <TextArea label="Comment" minRows={12} maxRows={12} />
      </FlexColumn>
    </Container>
  );
};

const RadioContainer = styled(FlexColumn)``;

const Container = styled(FlexRow)``;

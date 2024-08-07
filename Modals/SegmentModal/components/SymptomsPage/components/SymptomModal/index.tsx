import { Button } from "@components/Button";
import { Modal } from "@Modals/Modal";
import { Select } from "@components/Select";
import { Switch } from "@components/Switch";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { FlexRow } from "@design-components/Flex";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getDateAndTimeFromIsoDate,
  getDateFromString,
} from "@utils/helpers/date";
import { theme } from "@styles/theme";
import { DateTimePicker } from "@components/DateTimePicker";
import { DateAndTimePicker } from "@components/DateAndTimePicker";
import { media } from "@styles/media-query";

const SymptomSchema = zod.object({
  name: zod.string().min(1),
  datetime: zod.date().optional().nullable(),
});

export type CreateSymptom = zod.infer<typeof SymptomSchema>;

type InterventionModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (intervention: CreateSymptom) => void;
  defaultValues?: CreateSymptom;
};

export const SymptomModal = ({
  open,
  onClose,
  onAdd,
  defaultValues,
}: InterventionModalProps) => {
  const { register, handleSubmit, reset, control, setValue, formState } =
    useForm<CreateSymptom>({
      resolver: zodResolver(SymptomSchema),
      defaultValues: {
        name: defaultValues?.name,
        datetime: defaultValues?.datetime,
      },
    });

  const { errors } = formState;

  const close = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CreateSymptom) => {
    onAdd(data);
    reset();
    close();
  };

  return (
    <Modal open={open} onClose={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                placeholder="Symptom*"
                {...register("name")}
                error={errors.name?.message}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="datetime"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DateAndTimePicker
                    value={value}
                    onChange={onChange}
                    onClear={() => {
                      setValue("datetime", null);
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box mt={4}>
            <Button fullWidth type="submit">
              {!!defaultValues ? "Save changes" : "Add symptom"}
            </Button>
          </Box>
        </Container>
      </form>
    </Modal>
  );
};

const Container = styled.div`
  width: 500px;
  height: fit-content;

  ${media.up.tablet`
    width: 60vw;
  `}
`;

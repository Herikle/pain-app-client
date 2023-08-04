import { Button } from "@components/Button";
import { Modal } from "@components/Modals/Modal";
import { Select } from "@components/Select";
import { Switch } from "@components/Switch";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { FlexRow } from "@design-components/Flex";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDateAndTimeFromIsoDate } from "@utils/helpers/date";

const SymptomSchema = zod.object({
  name: zod.string().nonempty(),
  datetime: zod.string().nonempty(),
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
  const { register, handleSubmit, reset, formState } = useForm<CreateSymptom>({
    resolver: zodResolver(SymptomSchema),
    defaultValues: {
      name: defaultValues?.name,
      datetime: getDateAndTimeFromIsoDate(defaultValues?.datetime),
    },
  });

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
              <TextField placeholder="Symptom" {...register("name")} required />
            </Grid>
            <Grid xs={12}>
              <TextField
                placeholder="Date and Hour"
                type="datetime-local"
                {...register("datetime")}
                required
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
  width: 300px;
  height: fit-content;
`;

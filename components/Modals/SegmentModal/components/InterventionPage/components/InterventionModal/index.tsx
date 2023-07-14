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

const InterventionSchema = zod.object({
  name: zod.string().nonempty(),
  datetime: zod.string().nonempty(),
  dose: zod.string().nonempty(),
  effective: zod.boolean(),
});

export type CreateIntervention = zod.infer<typeof InterventionSchema>;

type InterventionModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (intervention: CreateIntervention) => void;
};

export const InterventionModal = ({
  open,
  onClose,
  onAdd,
}: InterventionModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIntervention>({
    resolver: zodResolver(InterventionSchema),
    defaultValues: {
      dose: "",
    },
  });

  const close = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CreateIntervention) => {
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
                placeholder="Intervention"
                {...register("name")}
                required
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                placeholder="Date and Hour"
                type="datetime-local"
                {...register("datetime")}
                required
              />
            </Grid>
            <Grid xs={6}>
              <Select
                options={[
                  {
                    id: "option-1",
                    label: "Option 1",
                  },
                  {
                    id: "option-2",
                    label: "Option 2",
                  },
                ]}
                getLabel={(option) => option.label}
                getValue={(option) => option.id}
                id="select-dose"
                register={register("dose")}
                required
                error={errors.dose?.message}
              />
            </Grid>
            <Grid xs={6}>
              <FlexRow justify="space-between" height="100%">
                <Text>Effective?</Text>
                <Switch register={register("effective")} />
              </FlexRow>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Button fullWidth type="submit">
              Add symptom
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

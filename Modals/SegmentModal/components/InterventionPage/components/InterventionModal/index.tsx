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
import { DateAndTimePicker } from "@components/DateAndTimePicker";
import { ALL_DOSES, Doses } from "../../const";
import { TextArea } from "@components/TextArea";
import { media } from "@styles/media-query";

const InterventionSchema = zod.object({
  name: zod.string().min(1, "Intervention name is required"),
  datetime: zod.date().optional().nullable(),
  dose: zod.custom<Doses>().optional().nullable(),
  effective: zod.boolean(),
  observation: zod.string().optional().nullable(),
});

export type CreateIntervention = zod.infer<typeof InterventionSchema>;

type InterventionModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (intervention: CreateIntervention) => void;
  defaultValues?: CreateIntervention;
};

export const InterventionModal = ({
  open,
  onClose,
  onAdd,
  defaultValues,
}: InterventionModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<CreateIntervention>({
    resolver: zodResolver(InterventionSchema),
    defaultValues: {
      name: defaultValues?.name,
      dose: defaultValues?.dose,
      datetime: defaultValues?.datetime,
      effective: defaultValues?.effective,
      observation: defaultValues?.observation,
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
                placeholder="Intervation name*"
                error={errors.name?.message}
                {...register("name")}
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
                    onClear={() => [setValue("datetime", null)]}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Select
                options={ALL_DOSES}
                getLabel={(option) => option.label}
                getValue={(option) => option.value}
                id="select-dose"
                {...register("dose")}
                error={errors.dose?.message}
              />
            </Grid>
            <Grid xs={12}>
              <TextArea
                placeholder="Intervention description"
                minRows={3}
                {...register("observation")}
              />
            </Grid>
            <Grid xs={12}>
              <FlexRow justify="center" height="100%">
                <Text variant="body1">This intervention was effective?</Text>
                <Switch
                  defaultChecked={watch("effective")}
                  register={register("effective")}
                />
              </FlexRow>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Button fullWidth type="submit">
              {!!defaultValues ? "Save changes" : "Add intervention"}
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

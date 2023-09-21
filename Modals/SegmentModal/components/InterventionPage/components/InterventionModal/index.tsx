import { Button } from "@components/Button";
import { Modal } from "Modals/Modal";
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
import { getDateAndTimeFromIsoDate } from "@utils/helpers/date";
import { DateTimePicker } from "@mui/x-date-pickers";
import { theme } from "@styles/theme";

const InterventionSchema = zod.object({
  name: zod.string().nonempty(),
  datetime: zod.date().optional(),
  dose: zod.string().optional(),
  effective: zod.boolean(),
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
  } = useForm<CreateIntervention>({
    resolver: zodResolver(InterventionSchema),
    defaultValues: {
      name: defaultValues?.name,
      dose: defaultValues?.dose,
      datetime: !!defaultValues?.datetime
        ? new Date(defaultValues?.datetime)
        : undefined,
      effective: defaultValues?.effective,
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
              <Controller
                control={control}
                name="datetime"
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "36px",
                        borderRadius: "2px",
                        border: `1px solid ${theme.colors.secondary_font}`,
                        "&.Mui-focused": {
                          border: `1px solid ${theme.colors.secondary_color}`,
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid xs={6}>
              <Select
                options={
                  Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    label: i,
                  })) ?? []
                }
                getLabel={(option) => option.label}
                getValue={(option) => option.id}
                id="select-dose"
                register={register("dose")}
                error={errors.dose?.message}
              />
            </Grid>
            <Grid xs={6}>
              <FlexRow justify="space-between" height="100%">
                <Text>Effective?</Text>
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
  width: 300px;
  height: fit-content;
`;

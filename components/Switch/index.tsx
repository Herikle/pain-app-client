import MaterialSwitch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { theme } from "@styles/theme";

type Props = {
  register?: any;
} & SwitchProps;

const IOSSwitch = styled(({ register, ...rest }: Props) => (
  <MaterialSwitch disableRipple {...(register ?? {})} {...rest} />
))(({ theme: mTheme }) => ({
  width: 41,
  height: 23,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: theme.colors.pure_white,
      "& + .MuiSwitch-track": {
        backgroundColor: theme.colors.primary,
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 21,
    height: 21,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.colors.secondary_font,
    opacity: 1,
    transition: mTheme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const Switch = ({ register, ...rest }: Props) => {
  return (
    <FormGroup
      sx={{
        "& .MuiFormControlLabel-root": {
          margin: 0,
        },
      }}
    >
      <FormControlLabel
        control={<IOSSwitch register={register} {...rest} />}
        label=""
      />
    </FormGroup>
  );
};

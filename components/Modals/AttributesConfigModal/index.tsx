import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Modal } from "../Modal";
import styled from "styled-components";
import { Button } from "@components/Button";
import { useAttributesConfigModalState } from "./hook";
import { SetStateAction, useMemo } from "react";
import { TextField } from "@components/TextField";
import { IAttributesConfig } from "types";
import { TextArea } from "@components/TextArea";
import { useForm } from "react-hook-form";
import { useUpdatePrompt } from "@queries/prompt/usePrompt";
import { FormControlLabel, Switch } from "@mui/material";
import { Text } from "@components/Text";
import { textElipsis } from "@utils/helpers/string";
import { theme } from "@styles/theme";

export type AttributesConfigModalChildProps = {
  onClose: () => void;
  attributesConfig: IAttributesConfig;
  onUpdateAttributesConfig: (value: SetStateAction<IAttributesConfig>) => void;
  attribute: string;
  prompt_id?: string;
};

type FormValues = {
  label: string;
  helperText: string;
  placeholder: string;
  isTextArea: boolean;
};

const Child = ({
  onClose,
  attributesConfig,
  attribute,
  onUpdateAttributesConfig,
  prompt_id,
}: AttributesConfigModalChildProps) => {
  const updatePrompt = useUpdatePrompt(false);

  const helperTextValue = useMemo(
    () => attributesConfig.helperText?.[attribute] ?? "",
    [attributesConfig.helperText, attribute]
  );

  const placeholderValue = useMemo(
    () => attributesConfig.placeholder?.[attribute] ?? "",
    [attributesConfig.placeholder, attribute]
  );

  const labelTextValue = useMemo(
    () => attributesConfig.label?.[attribute] ?? "",
    [attributesConfig.label, attribute]
  );

  const isTextArea = useMemo(
    () => attributesConfig.isTextArea?.[attribute] ?? false,
    [attributesConfig.isTextArea, attribute]
  );

  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      label: labelTextValue,
      helperText: helperTextValue,
      placeholder: placeholderValue,
      isTextArea,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const updatedAttributesConfig = {
      ...attributesConfig,
      label: {
        ...(attributesConfig.label ?? {}),
        [attribute]: data.label,
      },
      helperText: {
        ...(attributesConfig.helperText ?? {}),
        [attribute]: data.helperText,
      },
      placeholder: {
        ...(attributesConfig.placeholder ?? {}),
        [attribute]: data.placeholder,
      },
      isTextArea: {
        ...(attributesConfig.isTextArea ?? {}),
        [attribute]: data.isTextArea,
      },
    };
    if (prompt_id) {
      await updatePrompt.mutateAsync({
        params: {
          prompt_id,
        },
        body: {
          attributesConfig: updatedAttributesConfig,
        },
      });
    }
    onUpdateAttributesConfig(updatedAttributesConfig);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <FlexRow gap={4} align="flex-start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container gap={2}>
            <TextField label="Label" {...register("label")} />
            <TextField label="Placeholder" {...register("placeholder")} />
            <TextArea
              label="Helper Text"
              minRows={4}
              maxRows={4}
              {...register("helperText")}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={watch("isTextArea")}
                  {...register("isTextArea")}
                />
              }
              label={<Text>use textarea</Text>}
            />

            <Button fullWidth loading={updatePrompt.isLoading}>
              Save
            </Button>
            <Button
              onClick={onClose}
              fullWidth
              color="pure_white"
              textColor="pure_black"
            >
              Cancel
            </Button>
          </Container>
        </form>
        <Divisor />
        <PreviewContainer gap={2} align="center" justify="space-between">
          <Text variant="body2Bold">Preview</Text>
          {watch("isTextArea") ? (
            <TextArea
              key={attribute}
              label={watch("label") || textElipsis(attribute, 50)}
              placeholder={watch("placeholder")}
              helperText={watch("helperText")}
              id={attribute}
              minRows={3}
              maxRows={3}
            />
          ) : (
            <TextField
              key={attribute}
              label={watch("label") || textElipsis(attribute, 50)}
              placeholder={watch("placeholder")}
              helperText={watch("helperText")}
              id={attribute}
            />
          )}
        </PreviewContainer>
      </FlexRow>
    </Modal>
  );
};

const Divisor = styled.div`
  width: 1px;
  height: 500px;
  background-color: ${theme.colors.secondary_font};
`;

const PreviewContainer = styled(FlexColumn)`
  min-width: 250px;
`;

const Container = styled(FlexColumn)`
  align-items: center;
  min-width: 250px;
`;

export const AttributesConfigModal = () => {
  const [isOpen, setIsOpen] = useAttributesConfigModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};

import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { SetStateAction, useState } from "react";
import { CommonKeyStringPair, IAttributesConfig, IPromptOptions } from "types";
import { useSetPromptOptionsModal } from "@Modals/PromptOptionsModal/hook";
import { Copy, Gear } from "@phosphor-icons/react";
import { Box } from "@mui/material";
import { Tooltip } from "react-tooltip";
import { theme } from "@styles/theme";
import { useSetAttributesConfigModal } from "@Modals/AttributesConfigModal/hook";

type PromptAttributesProps = {
  attributes: CommonKeyStringPair;
  onUpdateAttributes: (
    value: SetStateAction<{
      [key: string]: string;
    }>
  ) => void;
  attributesConfig: IAttributesConfig;
  onUpdateAttributesConfig: (value: SetStateAction<IAttributesConfig>) => void;
  sendPrompt: () => void;
  isLoading: boolean;
  options: IPromptOptions;
  getPromptWithAttributes: () => string;
  onUpdateOptions: (value: SetStateAction<IPromptOptions>) => void;
  prompt_id?: string;
};

export const PromptAttributes = ({
  attributes,
  onUpdateAttributes,
  attributesConfig,
  onUpdateAttributesConfig,
  sendPrompt,
  isLoading,
  options,
  getPromptWithAttributes,
  onUpdateOptions,
  prompt_id,
}: PromptAttributesProps) => {
  const noAttributes = Object.keys(attributes ?? {}).length === 0;

  const [copied, setCopied] = useState(false);

  const updateAttributeValue = (attribute: string, value: string) => {
    onUpdateAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const openPromptModal = useSetPromptOptionsModal();

  const openPromptOptionsModal = () => {
    openPromptModal({
      options,
      onUpdateOptions,
      prompt_id,
    });
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(getPromptWithAttributes());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const openAttributesConfigModal = useSetAttributesConfigModal();

  const openAttributesConfig = (attribute: string) => {
    openAttributesConfigModal({
      attributesConfig,
      onUpdateAttributesConfig,
      attribute,
      prompt_id,
    });
  };

  return (
    <Attributes opacity={noAttributes ? 0.5 : 1}>
      <Text variant="body2Bold">Step 2: Edit your attributes</Text>
      {noAttributes ? (
        <Text mt={1} px={0.5}>
          {
            "You haven't generated any attribute form. Start writing a prompt with some attributes."
          }
        </Text>
      ) : (
        <FlexColumn gap={1}>
          <Grid container spacing={4}>
            {Object.keys(attributes).map((attribute) => (
              <Grid xs={12} key={attribute}>
                <FlexRow align="flex-start">
                  <TextArea
                    label={attribute}
                    fullWidth
                    value={attributes[attribute]}
                    onChange={(e) =>
                      updateAttributeValue(attribute, e.target.value)
                    }
                  />
                  <Gear
                    size={22}
                    color={theme.colors.text_switched}
                    cursor="pointer"
                    onClick={() => openAttributesConfig(attribute)}
                  />
                </FlexRow>
              </Grid>
            ))}
          </Grid>
          <FlexRow gap={1} justify="flex-start">
            <Button width="200px" color="cta" onClick={openPromptOptionsModal}>
              Prompt Configuration
            </Button>
            <Copy
              cursor="pointer"
              size={32}
              color={theme.colors.primary}
              weight="fill"
              onClick={copyPrompt}
              id="copy-prompt"
            />
            {!copied && (
              <Tooltip anchorSelect="#copy-prompt">
                Copy prompt with attributes
              </Tooltip>
            )}
            <Tooltip isOpen={copied} anchorSelect="#copy-prompt">
              Copied!
            </Tooltip>
          </FlexRow>
          <Button width="300px" onClick={sendPrompt} loading={isLoading}>
            Run prompt with those attributes
          </Button>
        </FlexColumn>
      )}
    </Attributes>
  );
};

type CommonOpacityProps = {
  opacity: number;
};

const Attributes = styled(FlexColumn)<CommonOpacityProps>`
  margin-top: 2rem;
  width: 100%;
  max-width: 900px;
  opacity: ${(props) => props.opacity};
`;

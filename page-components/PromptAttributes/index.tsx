import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn } from "@design-components/Flex";
import { SetStateAction } from "react";
import { CommonKeyStringPair } from "types";

type PromptAttributesProps = {
  attributes: CommonKeyStringPair;
  onUpdateAttributes: (
    value: SetStateAction<{
      [key: string]: string;
    }>
  ) => void;
  sendPrompt: () => void;
  isLoading: boolean;
};

export const PromptAttributes = ({
  attributes,
  onUpdateAttributes,
  sendPrompt,
  isLoading,
}: PromptAttributesProps) => {
  const noAttributes = Object.keys(attributes).length === 0;

  const updateAttributeValue = (attribute: string, value: string) => {
    onUpdateAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
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
              <Grid xs={4} key={attribute}>
                <TextArea
                  label={attribute}
                  fullWidth
                  value={attributes[attribute]}
                  onChange={(e) =>
                    updateAttributeValue(attribute, e.target.value)
                  }
                  placeholder="Enter a value for this attribute"
                />
              </Grid>
            ))}
          </Grid>
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
  opacity: ${(props) => props.opacity};
`;

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { TextAreaWithSend } from "@components/TextAreaWithSend";
import { useGetPrompt } from "@queries/prompt/useGetPrompt";
import {
  useGenerateCompletion,
  useSavePrompt,
} from "@queries/prompt/usePrompt";
import { LightScrollBar, theme } from "@styles/theme";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import {
  getAllAttributesFromPrompt,
  promptHasAttributes,
} from "@utils/helpers/prompt";
import { useDebounce } from "@utils/hooks/useDebounce";
import { IconsPath } from "@utils/icons";
import { Star, Trash } from "@phosphor-icons/react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

type tokensUsage = {
  prompt_tokens: number;
  response_tokens: number;
  total: number;
};

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const [tokensUsage, setTokensUsage] = useState<tokensUsage | null>(null);

  const noAttributes = Object.keys(attributes).length === 0;

  const promptSaved = useGetPrompt();

  const generateResponse = useGenerateCompletion();

  const savePrompt = useSavePrompt();

  const generateAttributes = () => {
    const attributesDetected = getAllAttributesFromPrompt(prompt);
    if (attributesDetected) {
      const allAttributesKeys = attributesDetected;

      const newAttributes = {};

      allAttributesKeys.forEach((key) => {
        if (!attributes[key]) {
          newAttributes[key] = "";
        }
      });

      const currentAttibutes = { ...attributes };

      Object.keys(currentAttibutes).forEach((key) => {
        if (!attributesDetected.includes(key)) {
          delete currentAttibutes[key];
        }
      });

      setAttributes({
        ...currentAttibutes,
        ...newAttributes,
      });
    } else {
      setAttributes({});
    }
  };

  useEffect(() => {
    if (promptSaved.data) {
      setPrompt(promptSaved.data.prompt);
      setAttributes(promptSaved.data.attributes);
    }
  }, [promptSaved.data]);

  const updateAttributeValue = (attribute: string, value: string) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const sendPrompt = async () => {
    const promptWithAttributes = prompt.replace(
      /{{\s*([a-zA-Z0-9_]+)\s*}}/g,
      (_, attribute) => {
        return attributes[attribute];
      }
    );

    const response = await generateResponse.mutateAsync({
      body: {
        prompt: promptWithAttributes,
      },
    });

    setTokensUsage({
      prompt_tokens: response.prompt_tokens,
      response_tokens: response.response_tokens,
      total: response.total,
    });
    setGptResponse(response.response);
  };

  const onSavePrompt = async () => {
    await savePrompt.mutateAsync({
      body: {
        prompt: prompt,
        attributes: attributes,
      },
    });
  };

  const getResponseText = () => {
    if (generateResponse.isLoading) {
      return "GPT is thinking... Please don't close the page until it finishes.";
    }

    if (gptResponse) {
      return gptResponse;
    }

    if (noAttributes) {
      return "No input inserted. First, write a prompt on the step 1 field.";
    }

    return "GPT response will be shown here. You can also edit the prompt.";
  };

  const promptTokensText = () => {
    if (!!tokensUsage) {
      return `Tokens used on last input: ${tokensUsage.prompt_tokens}`;
    }

    return "No inputs sent.";
  };

  const responseTokensText = () => {
    if (!!tokensUsage) {
      return `Tokens used on last response: ${tokensUsage.response_tokens}`;
    }

    return "No answer received.";
  };

  const totalUsageText = () => {
    if (!!tokensUsage) {
      return `Total tokens used: ${tokensUsage.total}`;
    }

    return "You haven't made a query yet.";
  };

  return (
    <LoggedLayout onlySuper>
      <Container>
        <UserInteractionContainer opacity={1}>
          <WritePromptContainer gap={1}>
            <Text variant="body2Bold">Step 1: Input your prompt</Text>
            <TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt..."
              minRows={15}
            />
            <WritePromptBottom>
              <Button
                width="300px"
                disabled={!promptHasAttributes(prompt)}
                onClick={generateAttributes}
              >
                Generate attribute form
              </Button>
              <FlexRow gap={1.5}>
                <Trash
                  size={22}
                  cursor="pointer"
                  color={theme.colors.text_switched}
                />
                <Star
                  size={22}
                  cursor="pointer "
                  color={theme.colors.text_switched}
                />
              </FlexRow>
            </WritePromptBottom>
          </WritePromptContainer>
          <LoadSavedPromptContainer>
            <Text variant="body2Bold">Load a saved prompt</Text>
            <SavedPromptList>
              <Text align="center">
                {"You don't have any saved prompts. Press"}{" "}
                <Star
                  size={16}
                  cursor="pointer "
                  color={theme.colors.text_switched}
                />{" "}
                {"to save a prompt you write."}
              </Text>
            </SavedPromptList>
          </LoadSavedPromptContainer>
        </UserInteractionContainer>
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
              <Button
                width="300px"
                onClick={sendPrompt}
                loading={generateResponse.isLoading}
              >
                Run prompt with those attributes
              </Button>
            </FlexColumn>
          )}
        </Attributes>
        <PromptResponse opacity={noAttributes ? 0.5 : 1}>
          <PromptContainer gap={1}>
            <Text variant="body2Bold">Check your input</Text>
            <GptResponse>
              <Text
                variant="body2"
                whiteSpace="pre-line"
                color={!!gptResponse ? "font_color" : "medium_grey"}
              >
                {getResponseText()}
              </Text>
            </GptResponse>
            <Button width="300px">Start over</Button>
          </PromptContainer>
          <LoadSavedPromptContainer>
            <Text variant="body2Bold">Stats</Text>
            <TokensInfo>
              <FlexRow>
                <Image
                  src={IconsPath.DoctorBlack}
                  alt="Pain Track Icon"
                  width="22"
                  height="22"
                />
                <Text>{promptTokensText()}</Text>
              </FlexRow>
              <FlexRow>
                <Image
                  src={IconsPath.GPTBlack}
                  alt="ChatGPT Icon"
                  width="22"
                  height="22"
                />
                <Text>{responseTokensText()}</Text>
              </FlexRow>
              <Text>{totalUsageText()}</Text>
            </TokensInfo>
          </LoadSavedPromptContainer>
        </PromptResponse>
      </Container>
    </LoggedLayout>
  );
}

type CommonOpacityProps = {
  opacity: number;
};

const Attributes = styled(FlexColumn)<CommonOpacityProps>`
  margin-top: 2rem;
  width: 100%;
  opacity: ${(props) => props.opacity};
`;

const TokensInfo = styled(FlexColumn)`
  margin-top: 2rem;
  align-items: flex-start;
  gap: 1rem;
`;

const GptResponse = styled.div`
  border: 1px solid ${theme.colors.secondary_font};
  height: 100%;
  overflow: auto;
  width: 100%;
  padding: 1rem;
  ${LightScrollBar};
`;

const WritePromptBottom = styled(FlexRow)`
  justify-content: space-between;
`;

const SavedPromptList = styled(FlexColumn)`
  height: 265px;
  justify-content: center;
  overflow: auto;
`;

const LoadSavedPromptContainer = styled(FlexColumn)`
  width: 30%;
`;

const WritePromptContainer = styled(FlexColumn)`
  width: 70%;
`;

const PromptContainer = styled(FlexColumn)`
  height: 100%;
  width: 70%;
`;

const UserInteractionContainer = styled(FlexRow)<CommonOpacityProps>`
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  opacity: ${(props) => props.opacity};
`;

const PromptResponse = styled(FlexRow)<CommonOpacityProps>`
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  opacity: ${(props) => props.opacity};
  min-height: 20rem;
  height: 20rem;
`;

const Container = styled(FlexColumn)`
  gap: 4rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

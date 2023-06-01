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
import { FlexColumn, FlexRow } from "design-components/Flex";
import { LoggedLayout } from "layouts/LoggedLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllAttributesFromPrompt } from "utils/helpers/prompt";
import { useDebounce } from "utils/hooks/useDebounce";
import { IconsPath } from "utils/icons";

type tokensUsage = {
  prompt_tokens: number;
  response_tokens: number;
  total: number;
};

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");

  const promptDebouced = useDebounce<string>(prompt, 1000);

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const [gptResponse, setGptResponse] = useState(null);

  const [tokensUsage, setTokensUsage] = useState<tokensUsage>(null);

  const noAttributes = Object.keys(attributes).length === 0;

  const promptSaved = useGetPrompt();

  const generateResponse = useGenerateCompletion();

  const savePrompt = useSavePrompt();

  const handlePromptChange = (value: string) => {
    setPrompt(value);
  };

  useEffect(() => {
    if (promptDebouced) {
      const attributesDetected = getAllAttributesFromPrompt(promptDebouced);
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
    } else {
      setAttributes({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptDebouced]);

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
        <UserInteractionContainer>
          <Text variant="body2Bold">ChatGPT AI</Text>
          <GptResponse>
            <Text
              variant="body2"
              whiteSpace="pre-line"
              color={!!gptResponse ? "font_color" : "secondary_font"}
            >
              {getResponseText()}
            </Text>
          </GptResponse>
          <TextAreaWithSend
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Start writing a prompt..."
            onClickSend={sendPrompt}
            loading={generateResponse.isLoading}
          />
        </UserInteractionContainer>
        <StatsContainer>
          <TextItens>
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
            <Attributes>
              <Text variant="body2Bold">Attributes</Text>
              {noAttributes ? (
                <Text align="center" mt={1} px={1}>
                  You haven&apos;t entered any {"{{"}attribute{"}}"}. Attributes
                  you enter will show here.
                </Text>
              ) : (
                <>
                  {Object.keys(attributes).map((attribute) => (
                    <TextArea
                      key={attribute}
                      label={attribute}
                      fullWidth
                      value={attributes[attribute]}
                      onChange={(e) =>
                        updateAttributeValue(attribute, e.target.value)
                      }
                      placeholder="Enter a value for this attribute"
                    />
                  ))}
                </>
              )}
            </Attributes>
          </TextItens>
          <Button
            onClick={onSavePrompt}
            loading={savePrompt.isLoading}
            fullWidth
          >
            Save this prompt
          </Button>
        </StatsContainer>
      </Container>
    </LoggedLayout>
  );
}

const Attributes = styled(FlexColumn)`
  margin-top: 2rem;
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
`;

const TokensInfo = styled(FlexColumn)`
  margin-top: 2rem;
  align-items: flex-start;
  gap: 1rem;
`;

const TextItens = styled(FlexColumn)`
  align-items: flex-start;
  width: 100%;
`;

const StatsContainer = styled(FlexColumn)`
  align-items: flex-start;
  width: 30%;
  height: 100%;
  justify-content: space-between;
`;

const GptResponse = styled.div`
  border: 1px solid ${theme.colors.secondary_font};
  height: 100%;
  overflow: auto;
  width: 100%;
  padding: 1rem;
  ${LightScrollBar};
`;

const UserInteractionContainer = styled(FlexColumn)`
  width: 70%;
  height: 100%;
`;

const Container = styled(FlexRow)`
  gap: 4rem;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
`;

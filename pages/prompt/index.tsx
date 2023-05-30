import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextAreaWithSend } from "@components/TextAreaWithSend";
import { TextField } from "@components/TextField";
import { useGenerateCompletion } from "@queries/prompt/useGenerate";
import { LightScrollBar, theme } from "@styles/theme";
import { FlexColumn, FlexRow } from "design-components/Flex";
import { LoggedLayout } from "layouts/LoggedLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllAttributesFromPrompt } from "utils/helpers/prompt";
import { useDebounce } from "utils/hooks/useDebounce";
import { IconsPath } from "utils/icons";

const lorem = `Classification: Physical pain.

Justification: The pain is caused by the physical act of touching the feet on the ground. There is no indication of any psychological factors contributing to the pain.

JSON representation:

{
"duration_interval": [0.5, 1, 2],
"intensity_probabilities": {
"i. immediately after touching feet to ground": {
"Excruciating": 0,
"Disabling": 0,
"Hurtful": 80,
"Annoying": 20,
"No Pain": 0
},
"ii. after walking for a few minutes": {
"Excruciating": 0,
"Disabling": 0,
"Hurtful": 40,
"Annoying": 60,
"No Pain": 0
},
"iii. after resting for a period of time": {
"Excruciating": 0,
"Disabling": 0,
"Hurtful": 20,
"Annoying": 80,
"No Pain": 0
}
},
"pain_source": "Pain when touching feet to ground",
"classification": "Physical Pain"
}

Justification for the estimates:

Temporal Segment i - immediately after touching feet to ground (0.5 hours)
Based on the subject's description of the pain causing them to scream and cry, it can be inferred that the pain is relatively intense. However, it is unlikely to be considered excruciating as the subject did not report passing out or losing consciousness. The pain is also likely to be disabling, making it difficult for the subject to walk or move. Therefore, there is a high probability of the pain being described as hurtful. There is a minor possibility of no pain being experienced due to the suddenness and unexpectedness of the pain.

Temporal Segment ii - after walking for a few minutes (1 hour)
As the subject continues to walk on their feet, the pain is likely to decrease in intensity. However, the pain is unlikely to disappear completely within an hour. It is possible that the pain could be described as annoying or hurtful, but there is a lower probability of it being disabling or excruciating.

Temporal Segment iii - after resting for a period of time (2 hours)
Resting the feet for a period of time is likely to reduce the pain further. There is a low probability of the pain being disabling or excruciating, as the subject would have likely relieved the pressure on their feet. The pain is likely to be described as annoying or hurtful, but there is a higher probability of no pain being experienced at this stage.`;

type tokensUsage = {
  prompt_tokens: number;
  response_tokens: number;
  total: number;
};

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");

  const promptDebouced = useDebounce<string>(prompt, 1000);

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const [gptResponse, setGptResponse] = useState(lorem);

  const [tokensUsage, setTokensUsage] = useState<tokensUsage>(null);

  const noAttributes = Object.keys(attributes).length === 0;

  const generateResponse = useGenerateCompletion();

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
    <LoggedLayout>
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
                    <TextField
                      key={attribute}
                      label={attribute}
                      fullWidth
                      value={attributes[attribute]}
                      onChange={(e) =>
                        updateAttributeValue(attribute, e.target.value)
                      }
                      placeholder="Enter a value for this attribute"
                      multiline
                    />
                  ))}
                </>
              )}
            </Attributes>
          </TextItens>
          <Button disabled fullWidth>
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

import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { LightScrollBar, theme } from "@styles/theme";
import { IconsPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export type TokensUsageType = {
  prompt_tokens: number;
  response_tokens: number;
  total: number;
};

type PromptResponseProps = {
  noAttributes: boolean;
  gptResponse: string | null;
  isLoading: boolean;
  tokensUsage: TokensUsageType | null;
};

export const PromptResponse = ({
  gptResponse,
  isLoading,
  noAttributes,
  tokensUsage,
}: PromptResponseProps) => {
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

  const getResponseText = () => {
    if (isLoading) {
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

  return (
    <Container opacity={noAttributes ? 0.5 : 1}>
      <PromptContainer gap={1}>
        <Text variant="body2Bold">Check your output</Text>
        <GptResponse>
          <Text
            variant="body2"
            whiteSpace="pre-line"
            color={!!gptResponse ? "font_color" : "medium_grey"}
          >
            {getResponseText()}
          </Text>
        </GptResponse>
        <Link href={RoutesPath.new_prompt}>
          <Button width="300px">Start new prompt</Button>
        </Link>
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
    </Container>
  );
};

const TokensInfo = styled(FlexColumn)`
  margin-top: 2rem;
  align-items: flex-start;
  gap: 1rem;
`;

const LoadSavedPromptContainer = styled(FlexColumn)`
  width: 30%;
`;

const GptResponse = styled.div`
  border: 1px solid ${theme.colors.secondary_font};
  height: 100%;
  overflow: auto;
  width: 100%;
  padding: 1rem;
  ${LightScrollBar};
`;

const PromptContainer = styled(FlexColumn)`
  height: 100%;
  width: 70%;
`;

type CommonOpacityProps = {
  opacity: number;
};

const Container = styled(FlexRow)<CommonOpacityProps>`
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  opacity: ${(props) => props.opacity};
  min-height: 20rem;
  height: 20rem;
`;

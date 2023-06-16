import styled from "styled-components";
import { Inconsolata } from "next/font/google";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import { IconsPath } from "@utils/icons";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const inconsolata = Inconsolata({ subsets: ["latin"] });

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
  const getLoadingText = () => {
    if (isLoading) {
      return "GPT is thinking... Please don't close the page until it finishes.";
    }
  };

  return (
    <Container opacity={noAttributes ? 0.5 : 1}>
      <StatsContainer>
        <Text variant="body2Bold">Output</Text>
        {!!tokensUsage ? (
          <TokensInfo>
            <FlexRow>
              <Image
                src={IconsPath.GPTBlack}
                alt="ChatGPT Icon"
                width="22"
                height="22"
              />
              <Text fontFamily={inconsolata}>
                Tokens used in this answer: {tokensUsage.response_tokens}
              </Text>
            </FlexRow>
            <FlexRow>
              <Image
                src={IconsPath.GPTBlack}
                alt="ChatGPT Icon"
                width="22"
                height="22"
              />
              <Text fontFamily={inconsolata}>
                Total (input + answer): {tokensUsage.total}
              </Text>
            </FlexRow>
          </TokensInfo>
        ) : (
          <Text>
            No output generated yet. Your answer and statistics will appear
            here.
          </Text>
        )}
      </StatsContainer>
      <GptResponse>
        {gptResponse ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {gptResponse}
          </ReactMarkdown>
        ) : (
          <Text>{getLoadingText()}</Text>
        )}
      </GptResponse>
      {/* <PromptContainer gap={1}>
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
        {!!onClickStartNewPrompt ? (
          <Button width="300px" onClick={onClickStartNewPrompt}>
            Start new prompt
          </Button>
        ) : (
          <Link href={RoutesPath.new_prompt}>
            <Button width="300px">Start new prompt</Button>
          </Link>
        )}
      </PromptContainer> */}
    </Container>
  );
};

const TokensInfo = styled(FlexColumn)`
  margin-top: 2rem;
  align-items: flex-start;
  gap: 1rem;
`;

const StatsContainer = styled(FlexColumn)`
  width: 100%;
`;

const GptResponse = styled.div`
  /* border: 1px solid ${theme.colors.secondary_font}; */
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  > * {
    all: revert;
  }
  table,
  tr,
  td,
  th {
    border: 1px solid ${theme.colors.medium_grey};
    border-collapse: collapse;
  }
  table th,
  table td {
    padding: 0.5rem;
  }

  h2 {
    color: ${theme.colors.primary};
  }
`;

const PromptContainer = styled(FlexColumn)`
  height: 100%;
  width: 70%;
`;

type CommonOpacityProps = {
  opacity: number;
};

const Container = styled(FlexColumn)<CommonOpacityProps>`
  align-items: flex-start;
  width: fit-content;
  gap: 2rem;
  opacity: ${(props) => props.opacity};
`;

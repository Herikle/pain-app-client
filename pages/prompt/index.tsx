import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useGetPrompts } from "@queries/prompt/useGetPrompt";
import { useGenerateCompletion } from "@queries/prompt/usePrompt";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { WriteAndListPrompts } from "@page-components/WriteAndListPrompts";
import { PromptAttributes } from "@page-components/PromptAttributes";
import {
  PromptResponse,
  TokensUsageType,
} from "@page-components/PromptResponse";
import { useSetSelectedPrompt } from "state/useSelectedPrompt";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const [tokensUsage, setTokensUsage] = useState<TokensUsageType | null>(null);

  const setSelectedPrompt = useSetSelectedPrompt();

  const noAttributes = Object.keys(attributes).length === 0;

  const getPrompts = useGetPrompts();

  const prompts = useMemo(() => getPrompts.data, [getPrompts.data]);

  const generateResponse = useGenerateCompletion();

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

  useEffect(() => {
    setSelectedPrompt(null);
  }, [setSelectedPrompt]);

  return (
    <LoggedLayout onlySuper>
      <Container>
        <WriteAndListPrompts
          prompt={prompt}
          onChangePrompt={setPrompt}
          attributes={attributes}
          onChangeAttributes={setAttributes}
          tokensUsage={tokensUsage}
          prompts={prompts ?? []}
        />
        <PromptAttributes
          attributes={attributes}
          onUpdateAttributes={setAttributes}
          sendPrompt={sendPrompt}
          isLoading={generateResponse.isLoading}
        />
        <PromptResponse
          gptResponse={gptResponse}
          isLoading={generateResponse.isLoading}
          noAttributes={noAttributes}
          tokensUsage={tokensUsage}
        />
      </Container>
    </LoggedLayout>
  );
}

const Container = styled(FlexColumn)`
  gap: 4rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

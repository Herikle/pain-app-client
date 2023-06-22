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
import {
  EmptyAttributesConfig,
  IAttributesConfig,
  IPromptOptions,
} from "types";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const [attributesConfig, setAttributesConfig] = useState<IAttributesConfig>(
    EmptyAttributesConfig
  );

  const [options, setOptions] = useState<IPromptOptions>({});

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const [tokensUsage, setTokensUsage] = useState<TokensUsageType | null>(null);

  const setSelectedPrompt = useSetSelectedPrompt();

  const noAttributes = Object.keys(attributes ?? {}).length === 0;

  const getPrompts = useGetPrompts();

  const prompts = useMemo(() => getPrompts.data, [getPrompts.data]);

  const generateResponse = useGenerateCompletion();

  const getPromptWithAttributes = () => {
    const promptWithAttributes = prompt.replace(
      /{{\s*([a-zA-Z0-9_]+)\s*}}/g,
      (_, attribute) => {
        return attributes[attribute];
      }
    );

    return promptWithAttributes;
  };

  const sendPrompt = async () => {
    const promptWithAttributes = getPromptWithAttributes();

    const response = await generateResponse.mutateAsync({
      body: {
        prompt: promptWithAttributes,
        options,
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
          attributesConfig={attributesConfig}
          onChangeAttributesConfig={setAttributesConfig}
          options={options}
          tokensUsage={tokensUsage}
          prompts={prompts ?? []}
        />
        <PromptAttributes
          attributes={attributes}
          onUpdateAttributes={setAttributes}
          attributesConfig={attributesConfig}
          onUpdateAttributesConfig={setAttributesConfig}
          sendPrompt={sendPrompt}
          isLoading={generateResponse.isLoading}
          getPromptWithAttributes={getPromptWithAttributes}
          options={options}
          onUpdateOptions={setOptions}
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

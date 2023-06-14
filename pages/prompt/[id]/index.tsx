import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useGetPrompt, useGetPrompts } from "@queries/prompt/useGetPrompt";
import { useGenerateCompletion } from "@queries/prompt/usePrompt";
import { FlexColumn } from "@design-components/Flex";
import { LoggedLayout } from "@layouts/LoggedLayout";
import { WriteAndListPrompts } from "@page-components/WriteAndListPrompts";
import { PromptAttributes } from "@page-components/PromptAttributes";
import {
  PromptResponse,
  TokensUsageType,
} from "@page-components/PromptResponse";
import Router, { useRouter } from "next/router";
import { LoadingWrapper } from "@components/LoadingWrapper";
import { useSetSelectedPrompt } from "state/useSelectedPrompt";
import { useSetChangedPromptWarningModal } from "@components/Modals/ChangedPromptWarningModal/hook";
import { RoutesPath } from "@utils/routes";

export default function PromptPage() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const [prompt, setPrompt] = useState("");

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const [tokensUsage, setTokensUsage] = useState<TokensUsageType | null>(null);

  const noAttributes = Object.keys(attributes).length === 0;

  const getPrompts = useGetPrompts();

  const prompts = useMemo(() => getPrompts.data, [getPrompts.data]);

  const getPromptById = useGetPrompt(id);

  const promptById = useMemo(() => getPromptById.data, [getPromptById.data]);

  const generateResponse = useGenerateCompletion();

  const setSelectedPrompt = useSetSelectedPrompt();

  const setChangedPromptModal = useSetChangedPromptWarningModal();

  useEffect(() => {
    if (promptById) {
      setPrompt(promptById.prompt);
      setAttributes(promptById.attributes);
      setSelectedPrompt(promptById);
    }
  }, [promptById, setSelectedPrompt]);

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

  const hasChanged = () => {
    if (prompt !== promptById?.prompt) return true;
  };

  const onClickStartNewPrompt = () => {
    setChangedPromptModal({
      prompt_id: id,
      dataNotSaved: {
        prompt,
        attributes,
      },
      afterSave: () => {
        Router.push(RoutesPath.new_prompt);
      },
      onCancel: () => {
        Router.push(RoutesPath.new_prompt);
      },
    });
  };

  return (
    <LoggedLayout onlySuper>
      <LoadingWrapper
        loading={getPromptById.isLoading}
        overContainer
        size={64}
      />
      <Container>
        <WriteAndListPrompts
          prompt_id={id}
          prompt={prompt}
          onChangePrompt={setPrompt}
          attributes={attributes}
          onChangeAttributes={setAttributes}
          prompts={prompts ?? []}
          promptHasChanged={hasChanged()}
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
          onClickStartNewPrompt={
            hasChanged() ? onClickStartNewPrompt : undefined
          }
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

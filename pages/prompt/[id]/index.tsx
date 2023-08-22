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
import { useSetChangedPromptWarningModal } from "Modals/ChangedPromptWarningModal/hook";
import { RoutesPath } from "@utils/routes";
import {
  CommonKeyStringPair,
  EmptyAttributesConfig,
  IAttributesConfig,
  IPromptOptions,
} from "types";

export default function PromptPage() {
  const router = useRouter();

  const { id } = router.query as { id: string };

  const [prompt, setPrompt] = useState("");

  const [attributes, setAttributes] = useState<CommonKeyStringPair>({});

  const [attributesConfig, setAttributesConfig] = useState<IAttributesConfig>(
    EmptyAttributesConfig
  );

  const [options, setOptions] = useState<IPromptOptions>({});

  const [gptResponse, setGptResponse] = useState<string | null>(null);

  const [tokensUsage, setTokensUsage] = useState<TokensUsageType | null>(null);

  const noAttributes = Object.keys(attributes ?? {}).length === 0;

  const getPrompts = useGetPrompts();

  const prompts = useMemo(() => getPrompts.data, [getPrompts.data]);

  const getPromptById = useGetPrompt(id);

  const promptById = useMemo(() => getPromptById.data, [getPromptById.data]);

  const generateResponse = useGenerateCompletion();

  const setSelectedPrompt = useSetSelectedPrompt();

  const setChangedPromptModal = useSetChangedPromptWarningModal();

  useEffect(() => {
    if (id) {
      setTokensUsage(null);
      setGptResponse(null);
    }
  }, [id]);

  useEffect(() => {
    if (promptById) {
      setPrompt(promptById.prompt);
      setAttributes(promptById.attributes ?? {});
      setAttributesConfig(promptById.attributesConfig ?? EmptyAttributesConfig);
      setSelectedPrompt(promptById);
      setOptions(promptById.options ?? {});
    }
  }, [promptById, setSelectedPrompt]);

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
          attributesConfig={attributesConfig}
          onChangeAttributesConfig={setAttributesConfig}
          tokensUsage={tokensUsage}
          prompts={prompts ?? []}
          options={options}
          isMain={promptById?.isMain}
          promptHasChanged={hasChanged()}
          onClickNewPrompt={hasChanged() ? onClickStartNewPrompt : undefined}
        />
        <PromptAttributes
          attributes={attributes}
          onUpdateAttributes={setAttributes}
          attributesConfig={attributesConfig}
          onUpdateAttributesConfig={setAttributesConfig}
          sendPrompt={sendPrompt}
          isLoading={generateResponse.isLoading}
          options={options}
          getPromptWithAttributes={getPromptWithAttributes}
          onUpdateOptions={setOptions}
          prompt_id={id}
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

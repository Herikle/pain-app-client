import { Button } from "@components/Button";
import { GptResponseMarkdown } from "@components/GptResponseMarkdown";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { ArrowClockwise, Copy } from "@phosphor-icons/react";
import {
  GetPublicAttributesResponse,
  getPublicAttributes,
} from "@queries/public/useGetPublic";
import { useGenerateResponse } from "@queries/public/usePublic";
import { theme } from "@styles/theme";
import { textElipsis } from "@utils/helpers/string";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CommonKeyStringPair, EmptyAttributesConfig } from "types";
import ReCAPTCHA from "react-google-recaptcha";
import { TextField } from "@components/TextField";

export const getStaticProps: GetStaticProps<{
  attributes: GetPublicAttributesResponse;
}> = async () => {
  const attributes = await getPublicAttributes();
  return {
    props: {
      attributes,
    },
    revalidate: 1,
  };
};

export default function GeneratePage({
  attributes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const attributesList = Object.keys(attributes.attributes);
  const attributesConfig = attributes.attributesConfig ?? EmptyAttributesConfig;
  const [gptResponse, setGptResponse] = useState("");

  const [loadingRecaptcha, setLoadingRecaptcha] = useState(false);

  const { register, handleSubmit } = useForm();

  const generateResponse = useGenerateResponse();

  const onSubmit = async (data: any) => {
    setLoadingRecaptcha(true);
    const recaptchaValue = await recaptchaRef.current?.executeAsync();
    setLoadingRecaptcha(false);
    const response = await generateResponse.mutateAsync({
      body: {
        attributes: data,
        recaptchaToken: recaptchaValue,
      },
    });
    setGptResponse(response);
  };

  const recaptchaRef = React.createRef<ReCAPTCHA>();

  return (
    <>
      <Container>
        <FlexColumn gap={2}>
          <Text variant="h1" align="center">
            Describing Pain Episodes with the Cumulative Pain Method Generating
            an Initial Draft of a Scientific Manuscript
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FlexColumn gap={1} width="400px" marginInline="auto">
              {attributesList.map((attribute) =>
                attributesConfig.isTextArea?.[attribute] ? (
                  <TextArea
                    key={attribute}
                    label={
                      attributesConfig.label?.[attribute] ||
                      textElipsis(attribute, 50)
                    }
                    placeholder={attributesConfig.placeholder?.[attribute]}
                    helperText={attributesConfig.helperText?.[attribute]}
                    id={attribute}
                    minRows={3}
                    maxRows={3}
                    required
                    {...register(attribute)}
                  />
                ) : (
                  <TextField
                    key={attribute}
                    label={
                      attributesConfig.label?.[attribute] ||
                      textElipsis(attribute, 50)
                    }
                    placeholder={attributesConfig.placeholder?.[attribute]}
                    helperText={attributesConfig.helperText?.[attribute]}
                    id={attribute}
                    required
                    {...register(attribute)}
                  />
                )
              )}
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
              />
              <Button loading={generateResponse.isLoading || loadingRecaptcha}>
                Create your draft
              </Button>
            </FlexColumn>
          </form>
        </FlexColumn>
      </Container>
      <Response>
        <FlexColumn gap={2}>
          <Text variant="body2Bold">Output</Text>
          <FlexRow justify="flex-start" gap={2}>
            <Button
              color="pure_white"
              textColor="text_switched"
              textVariant="body2"
              onClick={() => alert("Not implemented yet")}
              noPadding
            >
              <FlexRow>
                <ArrowClockwise size={20} color={theme.colors.text_switched} />
                Start again
              </FlexRow>
            </Button>
            <Button
              color="pure_white"
              textColor="text_switched"
              textVariant="body2"
              onClick={() => alert("Not implemented yet")}
              noPadding
            >
              <FlexRow>
                <Copy size={20} color={theme.colors.text_switched} />
                Copy draft
              </FlexRow>
            </Button>
          </FlexRow>
        </FlexColumn>
        <ResponseTextContainer>
          <GptResponseMarkdown text={gptResponse} />
        </ResponseTextContainer>
      </Response>
    </>
  );
}

const ResponseTextContainer = styled.div`
  margin-top: 4rem;
`;

const Response = styled.div`
  height: 100vh;
  padding: 10rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 1440px) {
    margin-top: 5rem;
    padding: 1rem;
  }
`;

const Container = styled.div`
  margin-inline: auto;
  max-width: 600px;
  margin-top: 5rem;

  @media (max-width: 1440px) {
    margin-top: 0;
    padding: 1rem;
  }
`;

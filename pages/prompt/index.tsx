import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextAreaWithSend } from "@components/TextAreaWithSend";
import { LightScrollBar, theme } from "@styles/theme";
import { FlexColumn, FlexRow } from "design-components/Flex";
import { LoggedLayout } from "layouts/LoggedLayout";
import Image from "next/image";
import styled from "styled-components";
import { IconsPath } from "utils/icons";

export default function PromptPage() {
  return (
    <LoggedLayout>
      <Container>
        <UserInteractionContainer>
          <Text variant="body2Bold">ChatGPT AI</Text>
          <GptResponse>
            <Text color="secondary_font">
              GPT response will be shown here. You can also edit the prompt.
            </Text>
          </GptResponse>
          <TextAreaWithSend placeholder="Start writing a prompt..." />
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
                <Text>No inputs sent.</Text>
              </FlexRow>
              <FlexRow>
                <Image
                  src={IconsPath.GPTBlack}
                  alt="ChatGPT Icon"
                  width="22"
                  height="22"
                />
                <Text>No answer received</Text>
              </FlexRow>
              <Text>{"You haven't made a query yet."}</Text>
            </TokensInfo>
            <Attributes>
              <Text variant="body2Bold">Attributes</Text>
              <Text align="center" mt={1} px={1}>
                You haven&apos;t entered any {"{"}attributes{"}"}. Attributes
                you enter will show here.
              </Text>
            </Attributes>
          </TextItens>
          <Button disabled fullWidth>
            Update Prompt
          </Button>
        </StatsContainer>
      </Container>
    </LoggedLayout>
  );
}

const Attributes = styled(FlexColumn)`
  margin-top: 2rem;
`;

const TokensInfo = styled(FlexColumn)`
  margin-top: 2rem;
  align-items: flex-start;
  gap: 1rem;
`;

const TextItens = styled(FlexColumn)`
  align-items: flex-start;
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

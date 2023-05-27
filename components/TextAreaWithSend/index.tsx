import { PaperPlaneRight } from "@phosphor-icons/react";
import { LightScrollBar, theme } from "@styles/theme";
import { styled } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  placeholder?: string;
};

const MAX_ROWS = 40;

export const TextAreaWithSend = ({ placeholder }: Props) => {
  return (
    <Container>
      <TextArea maxRows={MAX_ROWS} placeholder={placeholder} />
      <SendCircle>
        <PaperPlaneRight
          size={18}
          weight="fill"
          color={theme.colors.pure_white}
        />
      </SendCircle>
    </Container>
  );
};

const SendCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.colors.secondary_font};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TextArea = styled(TextareaAutosize)`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  min-height: 24px;
  ${LightScrollBar};
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid ${theme.colors.secondary_font};
  display: flex;
  padding: 1rem;
  gap: 1rem;
  align-items: flex-end;
`;

import { PaperPlaneRight } from "@phosphor-icons/react";
import { LightScrollBar, theme } from "@styles/theme";
import styled, { css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { Oval } from "react-loader-spinner";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onClickSend?: () => void;
  loading?: boolean;
};

const MAX_ROWS = 20;

export const TextAreaWithSend = ({
  placeholder,
  value,
  onChange,
  onClickSend,
  loading,
}: Props) => {
  const click = () => {
    if (loading) return;
    if (!value) return;

    onClickSend?.();
  };

  return (
    <Container>
      <TextArea
        maxRows={MAX_ROWS}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <SendCircle $disabled={loading || !value} onClick={click}>
        {loading ? (
          <Oval
            width={18}
            height={18}
            strokeWidth={6}
            color={theme.colors.pure_white}
            secondaryColor={theme.colors.secondary_color}
          />
        ) : (
          <PaperPlaneRight
            size={18}
            weight="fill"
            color={theme.colors.pure_white}
          />
        )}
      </SendCircle>
    </Container>
  );
};

type SendCircleProps = {
  $disabled: boolean;
};

const SendCircle = styled.div<SendCircleProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${theme.colors.secondary_font};
  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: ${theme.colors.disabled_color};
      cursor: not-allowed;
    `}
`;

const TextArea = styled(TextareaAutosize)`
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

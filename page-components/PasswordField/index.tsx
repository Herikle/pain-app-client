import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface Props {
  customLabel?: string;
  register: UseFormRegisterReturn<"password" | "password_confirm">;
  error: string | undefined;
}

export const PasswordInput = ({ register, error, customLabel }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <Text variant="body2" fontWeight="700">
        {customLabel ?? "Your password"}
      </Text>
      <InputContainer>
        <TextField
          type={showPassword ? "text" : "password"}
          required
          {...register}
          error={error}
        />
        <EyeContainer
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeClosed size={22} weight="bold" />
          ) : (
            <Eye size={22} weight="bold" />
          )}
        </EyeContainer>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const EyeContainer = styled.button`
  border: none;
  background: none;
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
`;

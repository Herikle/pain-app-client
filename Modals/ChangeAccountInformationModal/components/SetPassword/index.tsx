import React, { useState } from "react";
import { ConfirmCodeSetPassword } from "./components/ConfirmCode";
import { SetPasswordFormForm } from "./components/SetPasswordForm";
import { PasswordSuccessfullySetted } from "./components/Success";

type EmailProps = {
  onSuccess: () => void;
};

export const SetPassword = ({ onSuccess }: EmailProps) => {
  const [secretToken, setSecretToken] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const onSuccessSetPassword = () => {
    setSuccess(true);
    onSuccess();
  };

  return !!secretToken ? (
    success ? (
      <PasswordSuccessfullySetted />
    ) : (
      <SetPasswordFormForm
        secret_token={secretToken}
        onSuccess={onSuccessSetPassword}
      />
    )
  ) : (
    <ConfirmCodeSetPassword
      onSuccess={(secret_token) => {
        setSecretToken(secret_token);
      }}
    />
  );
};

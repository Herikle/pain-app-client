import React, { useState } from "react";
import { ConfirmCodeSetPassword } from "./components/ConfirmCode";

type EmailProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export const SetPassword = ({ onBack, onSuccess }: EmailProps) => {
  const [secretToken, setSecretToken] = useState<string | null>(null);

  return (
    <ConfirmCodeSetPassword
      onSuccess={(secret_token) => {
        console.log(secret_token);
        setSecretToken(secret_token);
      }}
      onRetrySendCode={() => {}}
    />
  );
};

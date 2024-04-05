import React, { useState } from "react";
import { ConfirmCodeSetPassword } from "./components/ConfirmCode";

type EmailProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export const SetPassword = ({ onBack, onSuccess }: EmailProps) => {
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);

  return (
    <ConfirmCodeSetPassword
      onSuccess={() => {
        setIsCodeSuccess(true);
      }}
      onRetrySendCode={() => {}}
    />
  );
};

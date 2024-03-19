import React, { useState } from "react";
import { UpdateEmailForm } from "./components/UpdateEmailForm";
import { EmailSuccessfullyUpdated } from "./components/Success";
import { ConfirmCodeEmailChange } from "./components/ConfirmCode";

type EmailProps = {
  onBack: () => void;
};

export const Email = ({ onBack }: EmailProps) => {
  const [newEmail, setNewEmail] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);

  const isAllSuccess = isSuccess && !!newEmail;

  const userHasChoosenNewEmail = !!newEmail;

  return (
    <>
      {isAllSuccess ? (
        <EmailSuccessfullyUpdated email={newEmail} />
      ) : userHasChoosenNewEmail ? (
        <ConfirmCodeEmailChange
          onSuccess={() => {
            setIsSuccess(true);
          }}
          onRetrySendCode={() => {}}
        />
      ) : (
        <UpdateEmailForm
          onBack={onBack}
          onSuccess={(email) => {
            setNewEmail(email);
          }}
        />
      )}
    </>
  );
};

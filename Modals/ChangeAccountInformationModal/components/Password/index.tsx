import { useState } from "react";
import { MainFormContainer } from "../shared-styles";
import { UpdatePasswordForm } from "./components/UpdateForm";
import { PasswordSuccessfullyUpdated } from "./components/Success";

export type PasswordProps = {
  onBack: () => void;
};

export const Password = ({ onBack }: PasswordProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <>
      {isSuccess ? (
        <PasswordSuccessfullyUpdated />
      ) : (
        <UpdatePasswordForm onBack={onBack} onSuccess={onSuccess} />
      )}
    </>
  );
};

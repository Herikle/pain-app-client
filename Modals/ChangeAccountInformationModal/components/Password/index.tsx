import { useState } from "react";
import { MainFormContainer } from "../shared-styles";
import { UpdatePasswordForm } from "./components/UpdateForm";
import { PasswordSuccessfullyUpdated } from "./components/Success";

export type PasswordProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export const Password = ({
  onBack,
  onSuccess: onSuccessProps,
}: PasswordProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = () => {
    setIsSuccess(true);
    onSuccessProps();
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

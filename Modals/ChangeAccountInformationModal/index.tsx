import { Modal } from "../Modal";
import { useChangeAccountInformationModalState } from "./hook";
import { useState } from "react";
import { MainPage } from "./components/Main";
import { Email } from "./components/Email";
import styled, { css } from "styled-components";
import { media } from "@styles/media-query";
import { Password } from "./components/Password";
import { ConfirmActionModal } from "Modals/ConfirmActionModal";
import { SetPassword } from "./components/SetPassword";

export type AccountInformationsPages =
  | "main"
  | "email"
  | "password"
  | "setPassword";

export type ChildPropsChangeAccountInformationModal = {
  onClose: () => void;
};

const Child = ({ onClose }: ChildPropsChangeAccountInformationModal) => {
  const [page, setPage] = useState<AccountInformationsPages>("main");

  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  const [setPasswordSuccess, setSetPasswordSuccess] = useState(false);

  const [closeConfirmation, setCloseConfirmation] = useState(false);

  const [modalText, setModalText] = useState({ title: "", description: "" });

  const pages: Record<AccountInformationsPages, JSX.Element> = {
    main: <MainPage onChangePage={setPage} />,
    email: <Email onBack={() => setPage("main")} />,
    password: (
      <Password
        onBack={() => setPage("main")}
        onSuccess={() => setChangePasswordSuccess(true)}
      />
    ),
    setPassword: (
      <SetPassword
        onBack={() => setPage("main")}
        onSuccess={() => setSetPasswordSuccess(true)}
      />
    ),
  };

  const close = () => {
    if (page === "password") {
      if (!changePasswordSuccess) {
        setModalText({
          title: "Password change in progress",
          description:
            "Are you sure you want to leave? All changes will be lost.",
        });
        setCloseConfirmation(true);
        return;
      }
    }
    if (page === "setPassword") {
      if (!setPasswordSuccess) {
        setCloseConfirmation(true);
        setModalText({
          title: "Password set in progress",
          description:
            "Are you sure you want to leave? All changes will be lost.",
        });
        return;
      }
    }
    onClose();
  };

  return (
    <>
      <Modal onClose={close} hasCloseButton fullScreenOnMobile>
        <Container>{pages[page]}</Container>
      </Modal>
      {closeConfirmation && (
        <ConfirmActionModal
          title={modalText.title}
          description={modalText.description}
          onClose={() => setCloseConfirmation(false)}
          onConfirm={onClose}
          confirmText="Leave"
          cancelText="Stay"
        />
      )}
    </>
  );
};

const Container = styled.div`
  width: 700px;
  min-height: 550px;
  height: 550px;
  ${media.up.tablet`    
    width:100%;
    min-width: 70vw;
    min-height: unset;
    height: 100%;
  `}
`;

export const ChangeAccountInformationModal = () => {
  const [isOpen, setIsOpen] = useChangeAccountInformationModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};

import { Modal } from "../Modal";
import { useChangeAccountInformationModalState } from "./hook";
import { useState } from "react";
import { MainPage } from "./components/Main";
import { Email } from "./components/Email";
import styled, { css } from "styled-components";
import { media } from "@styles/media-query";
import { Password } from "./components/Password";
import { ConfirmActionModal } from "Modals/ConfirmActionModal";

export type AccountInformationsPages = "main" | "email" | "password";

export type ChildPropsChangeAccountInformationModal = {
  onClose: () => void;
};

const Child = ({ onClose }: ChildPropsChangeAccountInformationModal) => {
  const [page, setPage] = useState<AccountInformationsPages>("main");

  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  const [closeConfirmation, setCloseConfirmation] = useState(false);

  const pages: Record<AccountInformationsPages, JSX.Element> = {
    main: <MainPage onChangePage={setPage} />,
    email: <Email onBack={() => setPage("main")} />,
    password: (
      <Password
        onBack={() => setPage("main")}
        onSuccess={() => setChangePasswordSuccess(true)}
      />
    ),
  };

  const close = () => {
    if (page === "password" && !changePasswordSuccess) {
      setCloseConfirmation(true);
      return;
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
          title="Password chage in progress"
          description="Are you sure you want to leave? All changes will be lost."
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

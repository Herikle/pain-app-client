import { Modal } from "../Modal";
import { useChangeAccountInformationModalState } from "./hook";
import { useState } from "react";
import { MainPage } from "./components/Main";

export type AccountInformationsPages = "main" | "email" | "password";

export type ChildPropsChangeAccountInformationModal = {
  onClose: () => void;
};

const Child = ({ onClose }: ChildPropsChangeAccountInformationModal) => {
  const [page, setPage] = useState<AccountInformationsPages>("main");

  const pages: Record<AccountInformationsPages, JSX.Element> = {
    main: <MainPage onChangePage={setPage} />,
    email: <div />,
    password: <div />,
  };

  return (
    <Modal onClose={onClose} hasCloseButton>
      {pages[page]}
    </Modal>
  );
};

export const ChangeAccountInformationModal = () => {
  const [isOpen, setIsOpen] = useChangeAccountInformationModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};

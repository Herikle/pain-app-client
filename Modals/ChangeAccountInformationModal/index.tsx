import { Modal } from "../Modal";
import { useChangeAccountInformationModalState } from "./hook";
import { useState } from "react";
import { MainPage } from "./components/Main";
import { Email } from "./components/Email";
import styled, { css } from "styled-components";
import { media } from "@styles/media-query";

export type AccountInformationsPages = "main" | "email" | "password";

export type ChildPropsChangeAccountInformationModal = {
  onClose: () => void;
};

const Child = ({ onClose }: ChildPropsChangeAccountInformationModal) => {
  const [page, setPage] = useState<AccountInformationsPages>("main");

  const pages: Record<AccountInformationsPages, JSX.Element> = {
    main: <MainPage onChangePage={setPage} />,
    email: <Email onBack={() => setPage("main")} />,
    password: <div />,
  };

  return (
    <Modal onClose={onClose} hasCloseButton>
      <Container>{pages[page]}</Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 700px;
  min-height: 550px;
  ${media.up.tablet`    
    min-width: 70vw;
    min-height: unset;
  `}
`;

export const ChangeAccountInformationModal = () => {
  const [isOpen, setIsOpen] = useChangeAccountInformationModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};

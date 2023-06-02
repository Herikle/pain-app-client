import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export const Portal = ({ children }: Props) => {
  return createPortal(children, document.body);
};

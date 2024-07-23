type Props = {
  children: React.ReactNode;
  readOnly: React.ReactNode;
  isCreator: boolean;
};

export const CreatorFilter = ({ children, readOnly, isCreator }: Props) => {
  return <>{isCreator ? children : readOnly}</>;
};

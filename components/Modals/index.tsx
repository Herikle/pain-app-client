import { ChangedPromptWarningModal } from "./ChangedPromptWarningModal";
import { DeletePromptModal } from "./DeletePromptModal";
import { WelcomeUserTypeSelectorModal } from "./WelcomeUserTypeSelectorModal";

export const Modals = () => {
  return (
    <>
      <WelcomeUserTypeSelectorModal />
      <DeletePromptModal />
      <ChangedPromptWarningModal />
    </>
  );
};

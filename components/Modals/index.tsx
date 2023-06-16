import { ChangedPromptWarningModal } from "./ChangedPromptWarningModal";
import { DeletePromptModal } from "./DeletePromptModal";
import { PromptOptionsModal } from "./PromptOptionsModal";
import { WelcomeUserTypeSelectorModal } from "./WelcomeUserTypeSelectorModal";

export const Modals = () => {
  return (
    <>
      <WelcomeUserTypeSelectorModal />
      <DeletePromptModal />
      <ChangedPromptWarningModal />
      <PromptOptionsModal />
    </>
  );
};

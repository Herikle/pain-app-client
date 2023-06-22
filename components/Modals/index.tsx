import { AttributesConfigModal } from "./AttributesConfigModal";
import { ChangedPromptWarningModal } from "./ChangedPromptWarningModal";
import { DeletePromptModal } from "./DeletePromptModal";
import { PromptOptionsModal } from "./PromptOptionsModal";
import { SetMainPromptModal } from "./SetMainPromptModal";
import { WelcomeUserTypeSelectorModal } from "./WelcomeUserTypeSelectorModal";

export const Modals = () => {
  return (
    <>
      <WelcomeUserTypeSelectorModal />
      <DeletePromptModal />
      <ChangedPromptWarningModal />
      <PromptOptionsModal />
      <SetMainPromptModal />
      <AttributesConfigModal />
    </>
  );
};

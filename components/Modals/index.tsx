import { AttributesConfigModal } from "./AttributesConfigModal";
import { ChangedPromptWarningModal } from "./ChangedPromptWarningModal";
import { DeletePatientModal } from "./DeletePatientModal";
import { DeletePromptModal } from "./DeletePromptModal";
import { PromptOptionsModal } from "./PromptOptionsModal";
import { SegmentModal } from "./SegmentModal";
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
      <DeletePatientModal />
      <SegmentModal />
    </>
  );
};

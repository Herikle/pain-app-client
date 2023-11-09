import { AttributesConfigModal } from "./AttributesConfigModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { ChangedPromptWarningModal } from "./ChangedPromptWarningModal";
import { DeletePatientModal } from "./DeletePatientModal";
import { DeletePromptModal } from "./DeletePromptModal";
import { PromptOptionsModal } from "./PromptOptionsModal";
import { SegmentModal } from "./SegmentModal";
import { SetMainPromptModal } from "./SetMainPromptModal";
import { TrackModal } from "./TrackModal";
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
      <TrackModal />
      <ChangePasswordModal />
    </>
  );
};

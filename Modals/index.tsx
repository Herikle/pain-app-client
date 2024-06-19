import { AttributesConfigModal } from "./AttributesConfigModal";
import { ChangeAccountInformationModal } from "./ChangeAccountInformationModal";
import { ChangedPromptWarningModal } from "./ChangedPromptWarningModal";
import { CreateEpisodeModal } from "./CreateEpisodeModal";
import { DeletePatientModal } from "./DeletePatientModal";
import { DeletePromptModal } from "./DeletePromptModal";
import { DiscussionModalWrapper } from "./DiscussionModal";
import { JustificationModalWrapper } from "./JustificationModal";
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
      <ChangeAccountInformationModal />
      <JustificationModalWrapper />
      <CreateEpisodeModal />
      <DiscussionModalWrapper />
    </>
  );
};

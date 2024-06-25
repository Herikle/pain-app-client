import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { LightScrollBar, theme } from "@styles/theme";
import { Text } from "@components/Text";
import { IntensitiesPage } from "../IntensitiesPage";
import { SegmentPage } from "../SegmentPage";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Button } from "@components/Button";
import { Trash, X } from "@phosphor-icons/react";
import { QualityPage } from "../QualityPage";
import { InterventionPage } from "../InterventionPage";
import { SymptomsPage } from "../SymptomsPage";
import { ISegment } from "types";
import {
  useDeleteSegment,
  useUpdateSegment,
} from "@queries/segment/useSegment";
import { useSegmentPageForm } from "./pagesFormHooks/useSegmentPageForm";
import { useIntensitiesPageForm } from "./pagesFormHooks/useIntensitiesPageForm";
import { useQualityPageForm } from "./pagesFormHooks/useQualityPageForm";
import { Portal } from "@components/Portal";
import { ConfirmActionModal } from "@Modals/ConfirmActionModal";
import { useInterventionPageForm } from "./pagesFormHooks/useInterventionPageForm";
import { useSymptomPageForm } from "./pagesFormHooks/useSymptomsPageForm";
import { SegmentModalTabs } from "../..";
import { media } from "@styles/media-query";
import { useSetJustificationModal } from "@Modals/JustificationModal/hooks";
import { remove_id, remove_idFromArrayOfObjects } from "@utils/helpers/object";
import { SyncingIndicator } from "@components/SyncingIndicator";
import { TooltipContent } from "@components/TooltipContent";
import { DiscussionOpener } from "@components/DiscussionOpener";

const TabSx = {
  "&.MuiTab-root": {
    color: theme.colors.text_switched,
    textTransform: "none",
    fontFamily: "inherit",
  },
  "&.Mui-selected": {
    color: theme.colors.font_color,
  },
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <TabPanelContainer
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </TabPanelContainer>
  );
};

const TabPanelContainer = styled.div``;

export type CommonUseHookPageForm = {
  segment: ISegment;
  episode_id: string;
};

const tabs_index: { [key in SegmentModalTabs]: number } = {
  segment: 0,
  intensities: 1,
  quality: 2,
  intervention: 3,
  symptoms: 4,
};

type Props = {
  segment: ISegment;
  episode_id: string;
  onClose: () => void;
  tab: SegmentModalTabs;
  episode: {
    name: string;
  };
  track: {
    name: string;
  };
  patient?: {
    name: string;
  };
  patient_id?: string;
};

export const SegmentIndex = ({
  segment,
  patient_id,
  episode_id,
  episode,
  track,
  patient,
  onClose,
  tab,
}: Props) => {
  const [value, setValue] = useState(tabs_index[tab]);

  const [confirmDeleteSegment, setConfirmDeleteSegment] = useState(false);

  const setJustifcationModal = useSetJustificationModal();

  const deleteSegment = useDeleteSegment();

  const closeSegmentModal = () => {
    setJustifcationModal(null);
    onClose();
  };

  const onDeleteSegment = async () => {
    await deleteSegment.mutateAsync({
      params: {
        segment_id: segment._id,
      },
      extra: {
        episode_id,
      },
    });
    closeSegmentModal();
  };

  const {
    isSyncing: isSyncingSegmentPageForm,
    segmentPageForm,
    onChangeSsegmentPageForm,
    setSegmentPageFormIsValid,
  } = useSegmentPageForm({
    segment,
    episode_id,
  });

  const {
    isSyncing: isSyncingIntensitiesPageForm,
    intensitiesPageForm,
    onChangeIntensitiesPageForm,
    setIntensitiesPageFormIsValid,
  } = useIntensitiesPageForm({
    segment,
    episode_id,
  });

  const {
    isSyncing: isSyncingQualityPageForm,
    qualityPageForm,
    onChangeQualityPageForm,
    setQualityPageFormIsValid,
  } = useQualityPageForm({ segment, episode_id });

  const {
    isSyncing: isSyncingInterventionPageForm,
    interventionPageForm,
    onChangeInterventionPageForm,
  } = useInterventionPageForm({
    segment,
    episode_id,
  });

  const {
    isSyncing: isSyncingSymptomPageForm,
    symptomPageForm,
    onChangeSymptomPageForm,
  } = useSymptomPageForm({ segment, episode_id });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const close = () => {
    closeSegmentModal();
  };

  const getColor = (index: number) => {
    if (index === value) {
      return "font_color";
    }
    return "text_switched";
  };

  return (
    <>
      <Container data-cy="edit-segment-modal">
        <Content>
          <TabsContainer>
            <Tabs
              onChange={handleChange}
              value={value}
              aria-label="Tabs where each tab needs to be selected manually"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.colors.primary,
                },
              }}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab
                data-cy="segment-tab"
                label={
                  <Text variant="body1Bold" color={getColor(0)}>
                    Segment
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                data-cy="intensities-tab"
                label={
                  <Text variant="body1Bold" color={getColor(1)}>
                    Intensities
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                data-cy="quality-tab"
                label={
                  <Text variant="body1Bold" color={getColor(2)}>
                    Quality
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                data-cy="intervention-tab"
                label={
                  <Text variant="body1Bold" color={getColor(3)}>
                    Intervention
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                data-cy="symptoms-tab"
                label={
                  <Text variant="body1Bold" color={getColor(4)}>
                    Symptoms
                  </Text>
                }
                sx={TabSx}
              />
            </Tabs>
          </TabsContainer>
          <BodyContent>
            <CustomTabPanel value={value} index={0}>
              <SegmentPage
                segmentPageForm={segmentPageForm}
                onChange={onChangeSsegmentPageForm}
                onValidChange={setSegmentPageFormIsValid}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <IntensitiesPage
                segment={segment}
                intensities={intensitiesPageForm}
                onChange={onChangeIntensitiesPageForm}
                onValidChange={setIntensitiesPageFormIsValid}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <QualityPage
                qualityValues={qualityPageForm}
                onChange={onChangeQualityPageForm}
                onValidChange={setQualityPageFormIsValid}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <InterventionPage
                interventions={interventionPageForm}
                onChange={onChangeInterventionPageForm}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <SymptomsPage
                symptoms={symptomPageForm}
                onChange={onChangeSymptomPageForm}
              />
            </CustomTabPanel>
          </BodyContent>
        </Content>
        <XContainer>
          <FlexRow>
            {!!patient_id && (
              <DiscussionOpener
                breadcrumb={[
                  patient?.name ?? "",
                  episode.name,
                  track.name ?? "",
                  segment.name ?? "",
                ]}
                patient_id={patient_id}
                episode_id={episode_id}
                track_id={segment.track_id}
                segment_id={segment._id}
              />
            )}
            <TooltipContent tooltip="Delete Segment">
              <Trash
                onClick={() => setConfirmDeleteSegment(true)}
                size={24}
                color={theme.colors.text_switched}
                cursor="pointer"
              />
            </TooltipContent>
            <SyncingIndicator
              isSyncing={
                isSyncingSegmentPageForm ||
                isSyncingIntensitiesPageForm ||
                isSyncingQualityPageForm ||
                isSyncingInterventionPageForm ||
                isSyncingSymptomPageForm
              }
            />
            <X
              size={24}
              color={theme.colors.font_color}
              onClick={close}
              cursor="pointer"
            />
          </FlexRow>
        </XContainer>
      </Container>
      <Portal>
        <ModalOverlay onClick={close} />
      </Portal>
      {confirmDeleteSegment && (
        <ConfirmActionModal
          description="Are you sure you want to delete this segment?"
          onConfirm={onDeleteSegment}
          onClose={() => setConfirmDeleteSegment(false)}
          hasCloseButton
          title="Delete Segment"
          loading={deleteSegment.isLoading}
        />
      )}
    </>
  );
};

const XContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  ${media.up.mobileL`
    top: 0.5rem;
    right: 0.5rem;
  `}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.pure_black};
  opacity: 0.5;
`;

const BodyContent = styled.div`
  overflow: auto;
  margin-bottom: 1rem;
  height: 100%;
  ${LightScrollBar};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  height: 100%;
`;

const CustomTabPanel = styled(TabPanel)`
  & .MuiBox-root {
    padding-inline: 2rem;
  }
`;

const TabsContainer = styled.div``;

const Container = styled(FlexColumn)`
  width: 950px;
  height: 80vh;
  max-width: 80vw;
  position: relative;
  padding: 1rem;
  padding-bottom: 0;
  ${media.up.laptopL`
    height: 95vh;
  `}
  justify-content: space-between;
  ${media.up.tablet`
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;   
    padding: 1rem;     
  `}

  ${media.up.mobileL`
    padding: 0;
    padding-bottom: 1rem;
    padding-top: 2rem;  
  `}
`;

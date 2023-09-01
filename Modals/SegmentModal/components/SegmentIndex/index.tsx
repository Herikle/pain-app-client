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
import { ConfirmActionModal } from "Modals/ConfirmActionModal";
import { useInterventionPageForm } from "./pagesFormHooks/useInterventionPageForm";
import { useSymptomPageForm } from "./pagesFormHooks/useSymptomsPageForm";
import { SegmentModalTabs } from "../..";
import { media } from "@styles/media-query";

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
};

export const SegmentIndex = ({ segment, episode_id, onClose, tab }: Props) => {
  const [value, setValue] = useState(tabs_index[tab]);

  const [segmentState, setSegmentState] = useState<ISegment>(segment);

  const [confirmClose, setConfirmClose] = useState(false);

  const [confirmDeleteSegment, setConfirmDeleteSegment] = useState(false);

  const deleteSegment = useDeleteSegment();

  const onDeleteSegment = async () => {
    await deleteSegment.mutateAsync({
      params: {
        segment_id: segment._id,
      },
      extra: {
        episode_id,
      },
    });
    onClose();
  };

  const {
    segmentPageForm,
    segmentPageFormIsValid,
    onChangeSsegmentPageForm,
    setSegmentPageFormIsValid,
    isDirtySegmentPageForm,
  } = useSegmentPageForm(segmentState);

  const {
    intensitiesPageForm,
    intensitiesPageFormIsValid,
    onChangeIntensitiesPageForm,
    setIntensitiesPageFormIsValid,
    isDirtyIntensitiesPageForm,
  } = useIntensitiesPageForm(segmentState);

  const {
    qualityPageForm,
    qualityPageFormIsValid,
    onChangeQualityPageForm,
    setQualityPageFormIsValid,
    isDirtyQualityPageForm,
  } = useQualityPageForm(segmentState);

  const {
    interventionPageForm,
    onChangeInterventionPageForm,
    isDirtyInterventionPageForm,
    getValuesToSend,
  } = useInterventionPageForm(segmentState);

  const {
    symptomPageForm,
    onChangeSymptomPageForm,
    isDirtySymptomPageForm,
    getValuesToSend: getSymptomValues,
  } = useSymptomPageForm(segmentState);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const close = () => {
    if (
      isDirtySegmentPageForm() ||
      isDirtyIntensitiesPageForm() ||
      isDirtyQualityPageForm() ||
      isDirtyInterventionPageForm() ||
      isDirtySymptomPageForm()
    ) {
      setConfirmClose(true);
    } else {
      onClose();
    }
  };

  const getColor = (index: number) => {
    if (index === value) {
      return "font_color";
    }
    return "text_switched";
  };

  const isValid = () => {
    return (
      segmentPageFormIsValid &&
      intensitiesPageFormIsValid &&
      qualityPageFormIsValid
    );
  };

  const updateSegment = useUpdateSegment();

  const onSubmit = async (closeAfterSave = false) => {
    const updatedSegment = await updateSegment.mutateAsync({
      params: {
        segment_id: segment._id,
      },
      body: {
        ...segmentPageForm,
        intensities: intensitiesPageForm,
        quality: qualityPageForm,
        interventions: getValuesToSend(),
        symptoms: getSymptomValues(),
      },
      extra: {
        episode_id,
      },
    });

    if (closeAfterSave) {
      onClose();
    } else {
      setSegmentState(updatedSegment);
    }
  };

  return (
    <>
      {confirmClose && (
        <ConfirmActionModal
          onClose={() => setConfirmClose(false)}
          onConfirm={() => onSubmit(true)}
          onCancel={onClose}
          title="Unsaved Changes"
          description="You have unsaved changes. Save them before closing?"
          confirmText="Save"
          cancelText="No, close without saving"
          loading={updateSegment.isLoading}
        />
      )}
      <Container id="batata">
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
                label={
                  <Text variant="body1Bold" color={getColor(0)}>
                    Segment
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                label={
                  <Text variant="body1Bold" color={getColor(1)}>
                    Intensities
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                label={
                  <Text variant="body1Bold" color={getColor(2)}>
                    Quality
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                label={
                  <Text variant="body1Bold" color={getColor(3)}>
                    Intervention
                  </Text>
                }
                sx={TabSx}
              />
              <Tab
                label={
                  <Text variant="body1Bold" color={getColor(4)}>
                    Symptoms
                  </Text>
                }
                sx={TabSx}
              />
            </Tabs>
          </TabsContainer>
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
        </Content>
        <FlexRow justify="space-between">
          <Trash
            onClick={() => setConfirmDeleteSegment(true)}
            size={32}
            color={theme.colors.text_switched}
            cursor="pointer"
          />
          <Button
            onClick={() => onSubmit()}
            width="160px"
            disabled={!isValid()}
            loading={updateSegment.isLoading}
          >
            Save changes
          </Button>
        </FlexRow>
        <XContainer>
          <X
            size={24}
            color={theme.colors.font_color}
            onClick={close}
            cursor="pointer"
          />
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

const Content = styled.div``;

const CustomTabPanel = styled(TabPanel)`
  & .MuiBox-root {
    padding-inline: 2rem;
    padding-block: 3rem;
  }
`;

const TabsContainer = styled.div``;

const Container = styled(FlexColumn)`
  width: 950px;
  min-height: 750px;
  height: fit-content;
  max-width: 80vw;
  max-height: 80vh;
  justify-content: space-between;
  position: relative;
  overflow: auto;
  padding: 2rem;
  ${LightScrollBar};
  ${media.up.laptopL`
    min-height: 80vh;    
  `}

  ${media.up.tablet`
    min-width: 100vw;
    max-width: 100vw;
    max-height: 100vh;
    min-height: 100vh;   
    padding: 1rem; 
  `}

  ${media.up.mobileL`
    padding: 0;
    padding-top:2rem;  
  `}
`;

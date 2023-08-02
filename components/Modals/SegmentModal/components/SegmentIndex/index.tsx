import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useCallback, useState } from "react";
import { LightScrollBar, theme } from "@styles/theme";
import { Text } from "@components/Text";
import { IntensitiesPage, IntensitiesPageForm } from "../IntensitiesPage";
import { SegmentPage, SegmentPageForm } from "../SegmentPage";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Button } from "@components/Button";
import { Trash } from "@phosphor-icons/react";
import { notImplemented } from "@utils/helpers/dev";
import { QualityPage } from "../QualityPage";
import { InterventionPage } from "../InterventionPage";
import { SymptomsPage } from "../SymptomsPage";
import { ISegment } from "types";
import { useUpdateSegment } from "@queries/segment/useSegment";

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

type Props = {
  segment: ISegment;
  episode_id: string;
};

export const SegmentIndex = ({ segment, episode_id }: Props) => {
  const [value, setValue] = useState(0);

  const [segmentPageForm, setSegmentPageForm] = useState<SegmentPageForm>({
    name: segment.name,
    start: segment.start,
    end: segment.end,
    estimative_type: segment.estimative_type,
    pain_type: segment.pain_type,
    start_date: segment.start_date,
    time_unit: segment.time_unit,
    comment: segment.comment,
  });
  const [segmentPageFormIsValid, setSegmentPageFormIsValid] = useState(true);

  const onChangeSsegmentPageForm = useCallback((data: SegmentPageForm) => {
    setSegmentPageForm(data);
  }, []);

  const [intensitiesPageForm, setIntensitiesPageForm] =
    useState<IntensitiesPageForm>({
      type: segment.intensities.type,
      justification: segment.intensities.justification,
      values: segment.intensities.values,
      draw: segment.intensities.draw,
    });

  const [intensitiesPageFormIsValid, setIntensitiesPageFormIsValid] =
    useState(true);

  const onChangeIntensitiesPageForm = useCallback(
    (data: IntensitiesPageForm) => {
      setIntensitiesPageForm(data);
    },
    []
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getColor = (index: number) => {
    if (index === value) {
      return "font_color";
    }
    return "text_switched";
  };

  const isValid = () => {
    return segmentPageFormIsValid && intensitiesPageFormIsValid;
  };

  const updateSegment = useUpdateSegment();

  const onSubmit = async () => {
    updateSegment.mutateAsync({
      params: {
        segment_id: segment._id,
      },
      body: {
        ...segmentPageForm,
        intensities: intensitiesPageForm,
      },
      extra: {
        episode_id,
      },
    });
  };

  return (
    <Container>
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
          <QualityPage />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <InterventionPage />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <SymptomsPage />
        </CustomTabPanel>
      </Content>
      <FlexRow justify="space-between">
        <Trash
          onClick={notImplemented}
          size={32}
          color={theme.colors.text_switched}
          cursor="pointer"
        />
        <Button
          onClick={onSubmit}
          width="160px"
          disabled={!isValid()}
          loading={updateSegment.isLoading}
        >
          Save changes
        </Button>
      </FlexRow>
    </Container>
  );
};

const Content = styled.div``;

const CustomTabPanel = styled(TabPanel)`
  & .MuiBox-root {
    padding-inline: 2rem;
    padding-block: 3rem;
  }
`;

const TabsContainer = styled.div``;

const Container = styled(FlexColumn)`
  width: 880px;
  min-height: 650px;
  height: fit-content;
  max-width: 80vw;
  max-height: 80vh;
  justify-content: space-between;
  overflow: auto;
  ${LightScrollBar};
  @media screen and (max-width: 1366px) {
    min-height: 80vh;
  }
`;

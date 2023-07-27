import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { LightScrollBar, theme } from "@styles/theme";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Button } from "@components/Button";
import { Trash } from "@phosphor-icons/react";
import { notImplemented } from "@utils/helpers/dev";
import { TrackDetailsPage, TrackEditType } from "./TrackDetailsPage";
import { ITrack } from "types";

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

type TrackIndexProps = {
  track: ITrack;
};

export const TrackIndex = ({ track }: TrackIndexProps) => {
  const [value, setValue] = useState(0);

  const [trackDetails, setTrackDetails] = useState<TrackEditType>(track);
  const [trackDetailIsDirty, setTrackDetailIsDirty] = useState(false);

  const onChangeTrackDetails = (data: TrackEditType, isDirty: boolean) => {
    setTrackDetails(data);
    setTrackDetailIsDirty(isDirty);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getColor = (index: number) => {
    if (index === value) {
      return "font_color";
    }
    return "text_switched";
  };

  const isDirty = () => {
    return trackDetailIsDirty;
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
                  Track details
                </Text>
              }
              sx={TabSx}
            />
          </Tabs>
        </TabsContainer>
        <CustomTabPanel value={value} index={0}>
          <TrackDetailsPage track={track} onChange={onChangeTrackDetails} />
        </CustomTabPanel>
      </Content>
      <FlexRow justify="space-between">
        <Trash
          onClick={notImplemented}
          size={32}
          color={theme.colors.text_switched}
          cursor="pointer"
        />
        <Button onClick={notImplemented} width="160px" disabled={!isDirty()}>
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

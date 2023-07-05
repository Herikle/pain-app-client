import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { theme } from "@styles/theme";
import { Text } from "@components/Text";
import { IntensitiesPage } from "../IntensitiesPage";

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

export const SegmentIndex = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getColor = (index: number) => {
    if (index === value) {
      return "font_color";
    }
    return "text_switched";
  };

  return (
    <Container>
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
      <TabPanel value={value} index={0}>
        Segment
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IntensitiesPage />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Quality
      </TabPanel>
      <TabPanel value={value} index={3}>
        Intervention
      </TabPanel>
      <TabPanel value={value} index={4}>
        Symptoms
      </TabPanel>
    </Container>
  );
};

const TabsContainer = styled.div``;

const Container = styled.div`
  width: 840px;
  height: 680px;
  max-width: 80vw;
  max-height: 80vh;
`;

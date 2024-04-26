import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { LightScrollBar, theme } from "@styles/theme";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Button } from "@components/Button";
import { Trash, X } from "@phosphor-icons/react";
import { TrackDetailsPage, TrackEditType } from "./TrackDetailsPage";
import { ITrack } from "types";
import { media } from "@styles/media-query";
import { DeleteTracKModal } from "Modals/DeleteTrackModal";
import { useUpdateTrack } from "@queries/track/useTrack";
import { useDebounce } from "@utils/hooks/useDebounce";
import { SyncingIndicator } from "@components/SyncingIndicator";
import { Portal } from "@components/Portal";

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

type TrackItemModal = {
  name: string;
  pain_type: "psychological" | "physical";
  comment?: string | undefined;
  _id: string;
};

type TrackIndexProps = {
  track: TrackItemModal;
  onClose: () => void;
};

export const TrackIndex = ({ track, onClose }: TrackIndexProps) => {
  const [value, setValue] = useState(0);

  const [trackDetails, setTrackDetails] = useState<TrackEditType>(track);

  const debouncedTrackDetails = useDebounce(trackDetails, 500);

  const updateTrack = useUpdateTrack();

  const [confirmDeleteTrack, setConfirmDeleteTrack] = useState(false);

  const [firstLoad, setFirstLoad] = useState(false);

  const openConfirmDelete = () => {
    setConfirmDeleteTrack(true);
  };

  const closeConfirmDelete = () => {
    setConfirmDeleteTrack(false);
    onClose();
  };

  const onChangeTrackDetails = useCallback((data: TrackEditType) => {
    setTrackDetails(data);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getColor = (index: number) => {
    if (index === value) {
      return "font_color";
    }
    return "text_switched";
  };

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
      return;
    }

    const update = async () => {
      await updateTrack.mutateAsync({
        params: {
          track_id: track._id,
        },
        body: debouncedTrackDetails,
      });
    };

    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTrackDetails]);

  return (
    <>
      <Container data-cy="edit-track-modal">
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
                    Track details
                  </Text>
                }
                sx={TabSx}
              />
            </Tabs>
          </TabsContainer>
          <CustomTabPanel value={value} index={0}>
            <TrackDetailsPage
              track={{ ...track, ...trackDetails }}
              onChange={onChangeTrackDetails}
            />
          </CustomTabPanel>
        </Content>
        <FlexRow justify="space-between">
          <Trash
            onClick={openConfirmDelete}
            size={32}
            color={theme.colors.text_switched}
            cursor="pointer"
          />
        </FlexRow>
        <XContainer>
          <FlexRow>
            <SyncingIndicator isSyncing={updateTrack.isLoading} />
            <X
              size={24}
              color={theme.colors.font_color}
              onClick={onClose}
              cursor="pointer"
            />
          </FlexRow>
        </XContainer>
      </Container>
      {confirmDeleteTrack && (
        <DeleteTracKModal onClose={closeConfirmDelete} track={track} />
      )}
      <Portal>
        <ModalOverlay onClick={onClose} />
      </Portal>
    </>
  );
};

const Content = styled.div``;

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

const XContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  ${media.up.mobileL`
    top: 0.5rem;
    right: 0.5rem;
  `}
`;

const CustomTabPanel = styled(TabPanel)`
  & .MuiBox-root {
    padding-inline: 2rem;
    padding-block: 3rem;
  }
`;

const TabsContainer = styled.div``;

const Container = styled(FlexColumn)`
  width: 880px;
  min-height: 800px;
  height: fit-content;
  max-width: 80vw;
  max-height: 80vh;
  justify-content: space-between;
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
    padding-bottom: 1rem;
    padding-top:2rem;
  `}
`;

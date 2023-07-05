import { SegmentsTitleComponent } from "@components/Track";
import { Segment } from "@components/Track/components/Segment";
import { FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";

export const IntensitiesPage = () => {
  return (
    <FlexRow gap={0} justify="flex-start">
      <SegmentsTitleComponent />
      <Segment hasDraw backgroundColor={theme.colors.pastel} isSolitary />
    </FlexRow>
  );
};

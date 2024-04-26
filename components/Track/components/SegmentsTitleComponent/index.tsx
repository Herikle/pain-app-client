import { TooltipContent } from "@components/TooltipContent";
import { SegmentName, SegmentsTitle } from "./styles";
import { PainType } from "@utils/helpers/segmentHelpers";
import { PAIN_DEFITIONS } from "@components/Track/const";
import { theme } from "@styles/theme";
import { FlexRow } from "@design-components/Flex";
import { Text } from "@components/Text";
import v from "voca";

type Props = {
  cumulativePainMode?: {
    active: boolean;
    hours: {
      e: string;
      d: string;
      h: string;
      a: string;
      n: string;
    };
  };
  removeExtraSpace?: boolean;
};

const pains: PainType[] = [
  "excruciating",
  "disabling",
  "hurful",
  "annoying",
  "no_pain",
];

const painsAbbreviation: { [key in PainType]: string } = {
  excruciating: "e",
  disabling: "d",
  hurful: "h",
  annoying: "a",
  no_pain: "n",
};

export const SegmentsTitleComponent = ({
  cumulativePainMode,
  removeExtraSpace,
}: Props) => {
  const isCumulativePainMode = !!cumulativePainMode?.active;

  const hours = cumulativePainMode?.hours;

  return (
    <SegmentsTitle>
      {pains.map((pain) => (
        <TooltipContent
          key={pain}
          tooltip={PAIN_DEFITIONS[pain]}
          bgColor={theme.pain_level_colors[pain]}
          place="top-start"
          minWidth={"500px"}
        >
          <SegmentName key={pain} $removeExtraSpace={removeExtraSpace}>
            {isCumulativePainMode ? (
              <FlexRow justify="start" align="center" gap={1} height="100%">
                <Text variant="h3" customColor={theme.pain_level_colors[pain]}>
                  {v.upperCase(painsAbbreviation[pain])}
                </Text>{" "}
                <Text
                  variant="body1Bold"
                  customColor={theme.pain_level_colors[pain]}
                >
                  {hours?.[painsAbbreviation[pain]]}
                </Text>
              </FlexRow>
            ) : (
              <Text variant="h3" customColor={theme.pain_level_colors[pain]}>
                {v.capitalize(pain.replace("_", " "))}
              </Text>
            )}
          </SegmentName>
        </TooltipContent>
      ))}
    </SegmentsTitle>
  );
};

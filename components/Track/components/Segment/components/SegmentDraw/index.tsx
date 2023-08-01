import { Paint } from "@components/Paint";
import { SEGMENT_HEIGHT, SEGMENT_WIDTH } from "../../const";
import { Section } from "../shared-style";

type DrawSectionProps = {
  hasDraw?: boolean;
  readOnly?: boolean;
};

export const SegmentDraw = ({
  hasDraw = false,
  readOnly = false,
}: DrawSectionProps) => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Section key={index} />
      ))}
      {hasDraw && (
        <Paint
          width={SEGMENT_WIDTH}
          height={SEGMENT_HEIGHT}
          readOnly={readOnly}
        />
      )}
    </>
  );
};

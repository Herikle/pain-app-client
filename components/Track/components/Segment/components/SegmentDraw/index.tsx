import { DrawObject, Paint } from "@components/Paint";
import { SEGMENT_HEIGHT, SEGMENT_WIDTH } from "../../const";
import { Section } from "../shared-style";

type DrawSectionProps = {
  hasDraw?: boolean;
  readOnly?: boolean;
  onChangeDraw?: (data: DrawObject[]) => void;
  initialDrawValue?: DrawObject[];
};

export const SegmentDraw = ({
  hasDraw = false,
  readOnly = false,
  initialDrawValue,
  onChangeDraw,
}: DrawSectionProps) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Section key={index} />
      ))}
      {hasDraw && (
        <Paint
          width={SEGMENT_WIDTH}
          height={SEGMENT_HEIGHT}
          readOnly={readOnly}
          onChange={onChangeDraw}
          initialDrawValue={initialDrawValue}
        />
      )}
    </>
  );
};

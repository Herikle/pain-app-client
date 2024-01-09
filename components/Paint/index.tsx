import { FlexColumn } from "@design-components/Flex";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PencilIcon from "public/icons/pencil.svg";
import update from "immutability-helper";
import { Eraser } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { Tooltip } from "react-tooltip";
import { transparentize } from "polished";

type Point = [number, number];
type Line = Point[];
type Position = { x: number; y: number };
export type DrawObject = {
  position: Position;
  points: Line;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type PaintProps = {
  width: number;
  height: number;
  readOnly?: boolean;
  onChange?: (data: DrawObject[]) => void;
  initialDrawValue?: DrawObject[];
};

const LINE_WIDTH = 1;
const LINE_COLOR = "black";
const LINE_OPACITY = 1;

export const Paint = ({
  width,
  height,
  readOnly,
  onChange,
  initialDrawValue,
}: PaintProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStartPosition, setCurrentStartPosition] =
    useState<Position | null>(null);

  const [firstRenderHasPassed, setFirstRenderHasPassed] = useState(false);

  const [currentPoints, setCurrentPoints] = useState<Line>([]);

  const [objects, setObjects] = useState<DrawObject[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(0,0,0,1)";
        ctx.shadowBlur = 1.5;
        ctx.globalAlpha = LINE_OPACITY;
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = LINE_WIDTH;
        ctxRef.current = ctx;
      }
    }
  }, []);

  const updateObjects = (newObjects: DrawObject[]) => {
    setObjects(newObjects);
    onChange?.(newObjects);
  };

  useEffect(() => {
    if (readOnly) {
      if (initialDrawValue) {
        clearWithoutUpdate();
        drawObjects(initialDrawValue);
      }
      return;
    }
    if (!firstRenderHasPassed) {
      setFirstRenderHasPassed(true);

      if (initialDrawValue) {
        drawObjects(initialDrawValue);
      }
    }
  }, [initialDrawValue, firstRenderHasPassed, readOnly]);

  const drawObjects = async (toDraw: DrawObject[]) => {
    try {
      for (const object of toDraw) {
        ctxRef.current?.beginPath();
        ctxRef.current?.moveTo(object.position.x, object.position.y);
        for (const point of object.points) {
          ctxRef.current?.lineTo(
            object.position.x + point[0],
            object.position.y + point[1]
          );
          ctxRef.current?.stroke();
          // await sleep(1);
        }
        ctxRef.current?.closePath();
      }
      setObjects(toDraw);
    } catch (error) {
      console.error(error);
    }
  };

  const startDrawing = (x, y) => {
    if (readOnly) return;
    if (ctxRef.current) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(x, y);
      setIsDrawing(true);
      setCurrentStartPosition({
        x,
        y,
      });
    }
  };

  const endDrawing = () => {
    if (readOnly) return;
    if (isDrawing && currentStartPosition) {
      if (ctxRef?.current) {
        ctxRef.current.closePath();
      }

      const newObjects = update(objects, {
        $push: [
          {
            position: currentStartPosition,
            points: currentPoints,
          },
        ],
      });

      updateObjects(newObjects);
      setCurrentStartPosition(null);
      setCurrentPoints([]);
    }
    setIsDrawing(false);
  };

  const draw = (x, y) => {
    if (readOnly) return;
    if (!isDrawing) {
      return;
    }
    if (ctxRef?.current) {
      if (currentStartPosition && canvasRef?.current) {
        ctxRef.current.lineTo(x, y);

        ctxRef.current.stroke();
        const points: Point = [
          x - currentStartPosition.x,
          y - currentStartPosition.y,
        ];

        setCurrentPoints((prev) => [...prev, points]);
      }
    }
  };

  const captureStartDrawingMouse = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    startDrawing(x, y);
  };

  const captureDrawMouse = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    draw(x, y);
  };

  const captureStartDrawingTouch = (e) => {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    startDrawing(x, y);
  };

  const captureDrawTouch = (e) => {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    draw(x, y);
  };

  const clearWithoutUpdate = () => {
    if (ctxRef?.current) {
      ctxRef.current.clearRect(
        0,
        0,
        ctxRef.current.canvas.width,
        ctxRef.current.canvas.height
      );
    }
  };

  const clear = () => {
    clearWithoutUpdate();
    updateObjects([]);
  };

  return (
    <Container
      style={{
        zIndex: readOnly ? -1 : 1,
      }}
    >
      <CanvasContainer
        style={{
          cursor: readOnly ? "default" : `url(${PencilIcon.src}) 5 22, auto`,
        }}
      >
        <Canvas
          onPointerDown={captureStartDrawingMouse}
          onPointerMove={captureDrawMouse}
          onPointerUp={endDrawing}
          onPointerLeave={endDrawing}
          ref={canvasRef}
          width={width}
          height={height}
        />
      </CanvasContainer>
      {!readOnly && (
        <>
          <Clear id="clear-drawing" onClick={clear}>
            <Eraser size={16} color={theme.colors.pure_black} />
          </Clear>
          <Tooltip anchorSelect="#clear-drawing">Clear drawing</Tooltip>
        </>
      )}
    </Container>
  );
};

const Canvas = styled.canvas`
  touch-action: none;
`;

const Clear = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0;
  background-color: ${theme.colors.hover_state};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  cursor: pointer;
  transform: translate(calc(100% + 0.5rem), -100%);
  box-shadow: 0px 4px 4px 0px ${transparentize(0.75, theme.colors.pure_black)};
`;

const CanvasContainer = styled.div``;

const Container = styled(FlexColumn)`
  position: absolute;
  top: 0;
`;

import { Button } from "@components/Button";
import { FlexColumn } from "@design-components/Flex";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LazyBrush } from "lazy-brush";

type Point = [number, number];
type Line = Point[];
type Position = { x: number; y: number };
type DrawObject = {
  position: Position;
  points: Line;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type PaintProps = {
  width: number;
  height: number;
};

export const Paint = ({ width, height }: PaintProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(1);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(1);
  const [stateSaved, setStateSaved] = useState<DrawObject[]>([]);
  const [currentStartPosition, setCurrentStartPosition] =
    useState<Position | null>(null);

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
        ctx.shadowBlur = 2;
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
      }
    }
  }, [lineColor, lineOpacity, lineWidth]);

  const drawObjects = async (toDraw: DrawObject[]) => {
    for (const object of toDraw) {
      ctxRef.current?.beginPath();
      ctxRef.current?.moveTo(object.position.x, object.position.y);
      for (const point of object.points) {
        ctxRef.current?.lineTo(
          object.position.x + point[0],
          object.position.y + point[1]
        );
        ctxRef.current?.stroke();
        await sleep(1);
      }
      ctxRef.current?.closePath();
    }
    setObjects(toDraw);
  };

  // Function for starting the drawing
  const startDrawing = (e) => {
    if (ctxRef.current) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setIsDrawing(true);
      setCurrentStartPosition({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    }
  };

  // Function for ending the drawing
  const endDrawing = () => {
    if (isDrawing && currentStartPosition) {
      if (ctxRef?.current) {
        ctxRef.current.closePath();
      }
      setObjects((prev) => [
        ...prev,
        {
          position: currentStartPosition,
          points: currentPoints,
        },
      ]);
      setCurrentStartPosition(null);
      setCurrentPoints([]);
    }
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    if (ctxRef?.current) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

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

  const clear = () => {
    if (ctxRef?.current) {
      ctxRef.current.clearRect(
        0,
        0,
        ctxRef.current.canvas.width,
        ctxRef.current.canvas.height
      );
    }
    setObjects([]);
  };

  const redraw = () => {
    drawObjects(stateSaved);
  };

  const save = () => {
    setStateSaved(objects);
  };

  return (
    <Container>
      <CanvasContainer>
        <canvas
          onMouseDown={startDrawing}
          onMouseLeave={endDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={500}
          height={500}
        />
      </CanvasContainer>
      {/* <Button onClick={clear}>Clear</Button>
      <Button onClick={redraw}>Redraw</Button>
      <Button onClick={save}>Save</Button> */}
    </Container>
  );
};

const CanvasContainer = styled.div`
  border: 1px solid black;
`;

const Container = styled(FlexColumn)``;

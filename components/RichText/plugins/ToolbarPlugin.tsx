/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { FlexRow } from "@design-components/Flex";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
} from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const LowPriority = 1;

const ICON_SIZE = 18;

const TollbarButton = ({
  children,
  disabled,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) => {
  return (
    <ToolbarButtonS
      type="button"
      disabled={disabled}
      onClick={onClick}
      $active={active}
    >
      {children}
    </ToolbarButtonS>
  );
};

type ToolbarButtonProps = {
  $active?: boolean;
};

const ToolbarButtonS = styled.button<ToolbarButtonProps>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;

  ${({ $active }) =>
    $active &&
    css`
      background-color: ${theme.colors.light_grey} !important;
    `}

  &:hover {
    background-color: ${theme.colors.hover_state};
  }
`;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <FlexRow gap={0} justify="flex-start">
      <TollbarButton
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="Undo"
      >
        <ArrowCounterClockwise size={ICON_SIZE} />
      </TollbarButton>
      <TollbarButton
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label="Redo"
      >
        <ArrowClockwise size={ICON_SIZE} />
      </TollbarButton>
      <Divider />
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        active={isBold}
        aria-label="Format Bold"
      >
        <TextB size={ICON_SIZE} />
      </TollbarButton>
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        active={isItalic}
        aria-label="Format Italics"
      >
        <TextItalic size={ICON_SIZE} />
      </TollbarButton>
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        active={isUnderline}
        aria-label="Format Underline"
      >
        <TextUnderline size={ICON_SIZE} />
      </TollbarButton>
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        active={isStrikethrough}
        aria-label="Format Strikethrough"
      >
        <TextStrikethrough size={ICON_SIZE} />
      </TollbarButton>
      <Divider />
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        aria-label="Left Align"
      >
        <TextAlignLeft size={ICON_SIZE} />
      </TollbarButton>
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        aria-label="Center Align"
      >
        <TextAlignCenter size={ICON_SIZE} />
      </TollbarButton>
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        aria-label="Right Align"
      >
        <TextAlignRight size={ICON_SIZE} />
      </TollbarButton>
      <TollbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        aria-label="Justify Align"
      >
        <TextAlignJustify size={ICON_SIZE} />
      </TollbarButton>{" "}
    </FlexRow>
  );
}

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #d8d8d8;
  margin: 0 8px;
`;

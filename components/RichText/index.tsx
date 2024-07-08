import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import ToolbarPlugin from "./plugins/ToolbarPlugin";
import styled, { css } from "styled-components";
import { theme as richTheme } from "./theme";
import { theme } from "@styles/theme";
import {
  EditorState,
  SerializedEditorState,
  SerializedLexicalNode,
} from "lexical";
import { RestoreStatePlugin } from "./plugins/RestoreStatePlugin";
import { OnlyTextPlugin } from "./plugins/OnlyTextPlugin";
import { UpdateEditableStatePlugin } from "./plugins/UpdateEditableStatePlugin";
import { useMemo, useState } from "react";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ActionsButtonPlugin } from "./plugins/ActionsButtonPlugin";

type PlaceholderProps = {
  placeholder: string | undefined;
};

function Placeholder({ placeholder }: PlaceholderProps) {
  return <PlaceholderDiv>{placeholder}</PlaceholderDiv>;
}

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: richTheme,
};

export type RichTextEditorJson = SerializedEditorState<SerializedLexicalNode>;

type RichTextProps = {
  onChange?: (editorState: EditorState) => void;
  initialValue?: RichTextEditorJson;
  disabled?: boolean;
  onlyText?: boolean;
  readOnly?: boolean;
  options?: {
    textElipsis?: number;
    clearOnSubmit?: boolean;
  };
  placeholder?: string;
  defaultEnabled?: boolean;
  mode?: "default" | "prepare";
  onSubmit?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  autoFocus?: boolean;
  buttonText?: string;
};

export const RichText = ({
  onChange,
  disabled,
  initialValue,
  onlyText,
  readOnly,
  options,
  placeholder,
  defaultEnabled = false,
  mode = "default",
  onSubmit,
  onCancel,
  loading,
  autoFocus,
  buttonText,
}: RichTextProps) => {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);

  const isOnPrepareMode = useMemo(() => mode === "prepare", [mode]);

  const isCompacted = useMemo(() => {
    if (!isOnPrepareMode) return false;

    return !isEnabled;
  }, [isOnPrepareMode, isEnabled]);

  const showToolbar = useMemo(() => {
    if (readOnly) return false;

    if (isCompacted) return false;

    return true;
  }, [isCompacted, readOnly]);

  const showActionButtons = useMemo(() => {
    if (!isOnPrepareMode) return false;

    return isEnabled;
  }, [isOnPrepareMode, isEnabled]);

  const runEnable = () => {
    if (!isOnPrepareMode) return;

    setIsEnabled(true);
  };

  const runDisable = () => {
    if (!isOnPrepareMode) return;

    onCancel && onCancel();
    setIsEnabled(false);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }

    if (options?.clearOnSubmit) {
      if (!isOnPrepareMode) return;

      runDisable();
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      {!onlyText && (
        <Container
          className="rich"
          $readOnly={readOnly}
          $singleLine={isCompacted}
          $hasActionButtons={showActionButtons}
        >
          <div className="editor-container">
            {showToolbar && <ToolbarPlugin />}
            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="editor-input"
                    onClick={runEnable}
                  />
                }
                placeholder={<Placeholder placeholder={placeholder} />}
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </div>
          <HistoryPlugin />
          {autoFocus && <AutoFocusPlugin />}
          {readOnly && <UpdateEditableStatePlugin />}
          {!disabled && !!onChange && <OnChangePlugin onChange={onChange} />}
          <ClearEditorPlugin />
          {showActionButtons && (
            <ActionsButtonPlugin
              onCancel={runDisable}
              onSubmit={handleSubmit}
              options={{ clearOnSubmit: options?.clearOnSubmit }}
              loading={loading}
              buttonText={buttonText}
            />
          )}
        </Container>
      )}

      {initialValue && <RestoreStatePlugin initialValue={initialValue} />}
      {onlyText && <OnlyTextPlugin elipsis={options?.textElipsis} />}
    </LexicalComposer>
  );
};

const PlaceholderDiv = styled.div`
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
`;

type ContainerProps = {
  $readOnly: boolean | undefined;
  $singleLine: boolean | undefined;
  $hasActionButtons: boolean | undefined;
};

const Container = styled.div<ContainerProps>`
  width: 100%;
  font-weight: 400;
  position: relative;

  & .editor-container {
    max-width: 100%;
  }

  ${({ $readOnly }) =>
    $readOnly
      ? css`
          padding-inline: 0;

          & .editor-input {
            padding: 0;
          }
        `
      : css`
          border: 1px solid ${theme.colors.secondary_font};
          padding-top: 0.5rem;
          padding-inline: 0.5rem;
        `}

  ${({ $singleLine, $hasActionButtons, $readOnly }) =>
    $singleLine
      ? css`
          padding-block: 0;
          & .editor-input {
          }
        `
      : css`
          & .editor-input {
            min-height: ${$hasActionButtons
              ? "50px"
              : $readOnly
              ? "unset"
              : "100px"};
          }
        `}
`;

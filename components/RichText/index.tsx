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

function Placeholder() {
  return <PlaceholderDiv>Text</PlaceholderDiv>;
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
  };
};

export const RichText = ({
  onChange,
  disabled,
  initialValue,
  onlyText,
  readOnly,
  options,
}: RichTextProps) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      {!onlyText && (
        <Container className="rich" $readOnly={readOnly}>
          <div className="editor-container">
            {!readOnly && <ToolbarPlugin />}
            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </div>
          <HistoryPlugin />
          <AutoFocusPlugin />
          {readOnly && <UpdateEditableStatePlugin />}
          {!disabled && !!onChange && <OnChangePlugin onChange={onChange} />}
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
  $readOnly?: boolean;
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
`;

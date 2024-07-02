import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import ToolbarPlugin from "./plugins/ToolbarPlugin";
import styled from "styled-components";
import { theme as richTheme } from "./theme";
import { theme } from "@styles/theme";
import {
  EditorState,
  SerializedEditorState,
  SerializedLexicalNode,
} from "lexical";

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
  disabled?: boolean;
};

export const RichText = ({ onChange, disabled }: RichTextProps) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Container className="rich">
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            {!disabled && !!onChange && <OnChangePlugin onChange={onChange} />}
          </div>
        </div>
      </Container>
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

const Container = styled.div`
  width: 100%;
  font-weight: 400;
  position: relative;
  border: 1px solid ${theme.colors.secondary_font};
  padding-top: 0.5rem;
  padding-inline: 0.5rem;
`;

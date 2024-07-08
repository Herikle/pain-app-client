import { Text } from "@components/Text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { textElipsis } from "@utils/helpers/string";
import { $getRoot } from "lexical";
import { useEffect, useState } from "react";

type OnlyTextPluginProps = {
  elipsis?: number;
};

export const OnlyTextPlugin = ({ elipsis }: OnlyTextPluginProps) => {
  const [editor] = useLexicalComposerContext();

  const [text, setText] = useState("");

  useEffect(() => {
    const parsedEditorState = editor.parseEditorState(
      editor.getEditorState().toJSON()
    );

    const editorStateString = parsedEditorState.read(() =>
      $getRoot().getTextContent()
    );

    setText(editorStateString);
  }, [editor]);

  return (
    <Text variant="body2">
      {elipsis ? <>{textElipsis(text, elipsis)}</> : <>{text}</>}
    </Text>
  );
};

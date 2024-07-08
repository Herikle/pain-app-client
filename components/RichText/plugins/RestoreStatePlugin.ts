import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useEffect, useState } from "react";
import { RichTextEditorJson } from "..";

type RestoreProps = {
  initialValue: RichTextEditorJson;
};

export const RestoreStatePlugin = ({ initialValue }: RestoreProps) => {
  const [editor] = useLexicalComposerContext();

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);

      try {
        const initialEditorState = editor.parseEditorState(initialValue);
        editor.setEditorState(initialEditorState);
      } catch (e) {
        console.log(e);
      }
    }
  }, [isFirstRender, editor, initialValue]);

  return null;
};

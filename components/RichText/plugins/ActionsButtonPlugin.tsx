import { Button } from "@components/Button";
import { FlexRow } from "@design-components/Flex";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_HIGH,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

type ActionsButtonProps = {
  onCancel: () => void;
  onSubmit: () => void;
  options?: {
    clearOnSubmit?: boolean;
  };
  loading?: boolean;
};

export const ActionsButtonPlugin = ({
  onCancel,
  onSubmit,
  options,
  loading,
}: ActionsButtonProps) => {
  const [editor] = useLexicalComposerContext();

  const handleSubmit = () => {
    onSubmit();

    if (options?.clearOnSubmit) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      const { ctrlKey, key } = event;

      if (ctrlKey && key === "Enter") {
        handleSubmit();
        return true;
      }

      if (key === "Escape") {
        onCancel();
      }

      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        handleKeyPress,
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        handleKeyPress,
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [editor, handleKeyPress]);

  return (
    <ButtonsFooter>
      <Button
        variant="text"
        textColor="pure_black"
        color="pure_white"
        onClick={onCancel}
        type="button"
      >
        Cancel
      </Button>
      <Button variant="contained" loading={loading} onClick={handleSubmit}>
        Comment
      </Button>
    </ButtonsFooter>
  );
};

const ButtonsFooter = styled(FlexRow)`
  width: 100%;
  justify-content: flex-end;
  padding-bottom: 1rem;
`;

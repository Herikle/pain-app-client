import { useSetDeletePromptModal } from "@components/Modals/DeletePromptModal/hook";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { FlexRow } from "@design-components/Flex";
import {
  Check,
  FileArrowUp,
  PencilSimpleLine,
  Trash,
  X,
} from "@phosphor-icons/react";
import { ThemeColors, theme } from "@styles/theme";
import { RoutesPath } from "@utils/routes";
import Link from "next/link";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { IPrompt } from "types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePrompt } from "@queries/prompt/usePrompt";
import { LoadingWrapper } from "@components/LoadingWrapper";
import Image from "next/image";
import { IconsPath } from "@utils/icons";
import { Tooltip } from "react-tooltip";

const schema = z.object({
  title: z.string().nonempty("Title is required"),
});

type PromptFormType = z.infer<typeof schema>;

type PromptListedProps = {
  prompt: IPrompt;
  selected: boolean;
  onPublishClick: (prompt_id: string) => void;
};

export const PromptListed = ({
  prompt,
  selected,
  onPublishClick,
}: PromptListedProps) => {
  const { handleSubmit, register, reset } = useForm<PromptFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: prompt.title,
    },
  });

  const [editMode, setEditMode] = useState(false);

  const updatePrompt = useUpdatePrompt();

  const toggleEditMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditMode(!editMode);
    if (!editMode) {
      reset();
    }
  };

  const setDeleteModal = useSetDeletePromptModal();

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteModal({
      prompt_id: prompt._id,
    });
  };

  const onClickPublish = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onPublishClick(prompt._id);
  };

  const submit = async (data: PromptFormType) => {
    await updatePrompt.mutateAsync({
      params: {
        prompt_id: prompt._id,
      },
      body: data,
    });
    setEditMode(false);
    reset(data);
  };

  const textColor: ThemeColors = selected ? "pure_white" : "text_switched";

  const render = useCallback(
    (children: React.ReactNode) => {
      if (!editMode) {
        return (
          <Link href={RoutesPath.prompt.replace("[id]", prompt._id)}>
            {children}
          </Link>
        );
      }

      return children;
    },
    [editMode, prompt._id]
  );

  return render(
    <Container $selected={selected}>
      {editMode ? (
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            noPadding
            fullWidth
            required
            autoFocus
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: theme.colors[textColor],
              fontSize: "16px",
              borderBottom: `1px solid ${theme.colors[textColor]}`,
              padding: 0,
            }}
            {...register("title")}
          />
          <LoadingWrapper
            loading={updatePrompt.isLoading}
            overContainer
            size={16}
          />
        </form>
      ) : (
        <FlexRow>
          {prompt.isMain && (
            <>
              <Image
                src={!selected ? IconsPath.PubMain : IconsPath.Publish}
                width={22}
                height={22}
                alt="publish prompt"
                id={`publish-prompt-${prompt._id}`}
                onClick={onClickPublish}
              />
              <Tooltip anchorSelect={`#publish-prompt-${prompt._id}`}>
                Publish prompt to the public
              </Tooltip>
            </>
          )}
          <Text color={textColor}>{prompt.title}</Text>
        </FlexRow>
      )}

      {editMode ? (
        <FlexRow gap={1.5}>
          <Check
            size={16}
            color={theme.colors.text_switched}
            cursor="pointer"
            onClick={handleSubmit(submit)}
          />
          <X
            size={16}
            color={theme.colors.text_switched}
            cursor="pointer"
            onClick={toggleEditMode}
          />
        </FlexRow>
      ) : (
        <IconsContainer gap={1.5}>
          {!prompt.isMain && (
            <Image
              src={IconsPath.PubMain}
              width={16}
              height={16}
              alt="publish prompt"
              id={`publish-prompt-${prompt._id}`}
              onClick={onClickPublish}
            />
          )}
          <PencilSimpleLine
            color={theme.colors.text_switched}
            size={16}
            cursor="pointer"
            onClick={toggleEditMode}
          />
          <Trash
            color={theme.colors.text_switched}
            size={16}
            cursor="pointer"
            onClick={onDelete}
          />
        </IconsContainer>
      )}
    </Container>
  );
};

type Props = {
  $selected: boolean;
};

const IconsContainer = styled(FlexRow)`
  opacity: 0;
`;

const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 1rem;
  form {
    width: 100%;
    padding-right: 1rem;
  }
  border-radius: 4px;
  ${({ $selected }) =>
    $selected &&
    css`
      background-color: ${theme.colors.primary};
    `}

  &:hover {
    ${({ $selected }) =>
      !$selected &&
      css`
        background-color: ${theme.colors.hover_state};
      `}
    ${IconsContainer} {
      opacity: 1;
    }
  }
`;

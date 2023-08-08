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
          {selected && (
            <FileArrowUp
              size={22}
              color={theme.colors.pure_white}
              onClick={onClickPublish}
            />
          )}
          <Text color={textColor}>{prompt.title}</Text>
        </FlexRow>
      )}
      <FlexRow gap={1.5}>
        {editMode ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </FlexRow>
    </Container>
  );
};

type Props = {
  $selected: boolean;
};

const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 1rem;
  padding-block: 1.25rem;
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
`;

import { useSetDeletePromptModal } from "@components/Modals/DeletePromptModal/hook";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { FlexRow } from "@design-components/Flex";
import { Check, PencilSimpleLine, Trash, X } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { RoutesPath } from "@utils/routes";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
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
};

export const PromptListed = ({ prompt, selected }: PromptListedProps) => {
  const { handleSubmit, register, reset } = useForm<PromptFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: prompt.title,
    },
  });

  const [editMode, setEditMode] = useState(false);

  const updatePrompt = useUpdatePrompt();

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      reset();
    }
  };

  const setDeleteModal = useSetDeletePromptModal();

  const onDelete = () => {
    setDeleteModal({
      prompt_id: prompt._id,
    });
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

  const color = selected ? "font_color" : "text_switched";

  return (
    <Container>
      {editMode ? (
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            noPadding
            fullWidth
            required
            autoFocus
            {...register("title")}
          />
          <LoadingWrapper
            loading={updatePrompt.isLoading}
            overContainer
            size={16}
          />
        </form>
      ) : (
        <Link href={RoutesPath.prompt.replace("[id]", prompt._id)}>
          <Text color={color}>{prompt.title}</Text>
        </Link>
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
              color={theme.colors[color]}
              size={16}
              cursor="pointer"
              onClick={toggleEditMode}
            />
            <Trash
              color={theme.colors[color]}
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  form {
    width: 100%;
    padding-right: 1rem;
  }
`;

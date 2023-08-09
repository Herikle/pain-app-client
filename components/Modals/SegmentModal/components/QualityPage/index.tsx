import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { QualityAttribute } from "@components/QualityAttribute";
import { IconsPath } from "@utils/icons";
import Grid from "@mui/material/Unstable_Grid2";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { TextField } from "@components/TextField";
import { TextArea } from "@components/TextArea";
import { CommonSegmentModalProps } from "../..";
import { depths, textures } from "./const";
import {
  IQualityDepth,
  IQualityTexture,
  qualityDepthEnum,
  qualityTextureEnum,
} from "types";
import { useForm, z, zodResolver } from "@utils/helpers/form-validation";

const QualitySchema = z.object({
  texture: z.enum(qualityTextureEnum).optional(),
  depth: z.enum(qualityDepthEnum).optional(),
  anatomy: z.string().optional(),
  comment: z.string().optional(),
});

const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
};

export type QualityFormValues = z.infer<typeof QualitySchema>;

type Props = {
  qualityValues?: QualityFormValues;
} & CommonSegmentModalProps<QualityFormValues>;

export const QualityPage = ({
  onChange,
  onValidChange,
  qualityValues,
}: Props) => {
  const { formState, register, getValues, watch } = useForm<QualityFormValues>({
    resolver: zodResolver(QualitySchema),
    defaultValues: {
      texture: qualityValues?.texture,
      depth: qualityValues?.depth,
      anatomy: qualityValues?.anatomy,
      comment: qualityValues?.comment,
    },
  });

  const textureIsNotSelected = (texture: IQualityTexture) => {
    const textureId = watch("texture");

    return !isNullOrUndefined(textureId) && texture !== textureId;
  };

  const depthIsNotSelected = (depth: IQualityDepth) => {
    const depthId = watch("depth");

    return !isNullOrUndefined(depthId) && depth !== depthId;
  };

  const onUpdate = () => {
    onChange(getValues());
  };

  const { isValid } = formState;

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  return (
    <form onChange={onUpdate}>
      <Container gap={4}>
        <SelectionSession gap={2}>
          <Section gap={1}>
            <Text variant="body1Bold">Texture</Text>
            <Grid container spacing={1}>
              {textures.map((texture) => (
                <Grid xs={6} key={texture.id}>
                  <QualityAttribute
                    iconPath={texture.iconPath}
                    label={texture.label}
                    description={texture.description}
                    register={register("texture")}
                    isSelected={watch("texture") === texture.id}
                    isNotSelected={textureIsNotSelected(texture.id)}
                    value={texture.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
          <Section gap={1}>
            <Text variant="body1Bold">Depth</Text>
            <Grid container spacing={1}>
              {depths.map((depth) => (
                <Grid xs={6} key={depth.id}>
                  <QualityAttribute
                    iconPath={depth.iconPath}
                    label={depth.label}
                    description={depth.description}
                    iconSize={36}
                    register={register("depth")}
                    isSelected={watch("depth") === depth.id}
                    isNotSelected={depthIsNotSelected(depth.id)}
                    value={depth.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
          <Section gap={1}>
            <Text variant="body1Bold">Anatomy</Text>
            <FlexRow justify="flex-start">
              <Image
                src={IconsPath.depth.anatomy}
                width={32}
                height={32}
                alt={`Attribute Anatomy Icon`}
              />
              <TextField fullWidth {...register("anatomy")} />
            </FlexRow>
          </Section>
        </SelectionSession>
        <CommentSection justify="flex-start">
          <TextArea
            label="Comment"
            placeholder="Write something..."
            minRows={25}
            maxRows={25}
            {...register("comment")}
          />
        </CommentSection>
      </Container>
    </form>
  );
};

const Section = styled(FlexColumn)``;

const CommentSection = styled(FlexColumn)`
  width: 40%;
`;

const SelectionSession = styled(FlexColumn)`
  width: 60%;
`;

const Container = styled(FlexRow)``;

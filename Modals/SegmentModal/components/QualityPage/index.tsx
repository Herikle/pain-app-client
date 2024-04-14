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
import { media } from "@styles/media-query";

const QualitySchema = z.object({
  texture: z.enum(qualityTextureEnum).optional().nullable(),
  depth: z.enum(qualityDepthEnum).optional().nullable(),
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
  const { formState, register, getValues, watch, setValue } =
    useForm<QualityFormValues>({
      resolver: zodResolver(QualitySchema),
      defaultValues: {
        texture: qualityValues?.texture ?? undefined,
        depth: qualityValues?.depth ?? undefined,
        anatomy: qualityValues?.anatomy ?? "",
        comment: qualityValues?.comment ?? "",
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

  useEffect(() => {
    onValidChange(true);
  }, [onValidChange]);

  const onClickTexture = (value: QualityFormValues["texture"]) => {
    const texture = getValues("texture");

    if (texture === value) {
      setValue("texture", undefined);
    } else {
      setValue("texture", value);
    }

    onUpdate();
  };

  const onClickDepth = (value: QualityFormValues["depth"]) => {
    const depth = getValues("depth");

    if (depth === value) {
      setValue("depth", undefined);
    } else {
      setValue("depth", value);
    }

    onUpdate();
  };

  return (
    <form onChange={onUpdate}>
      <Container data-cy="quality-page">
        <SelectionSession gap={2}>
          <Section gap={1}>
            <Text variant="body1Bold">Pain Texture</Text>
            <Grid container spacing={1}>
              {textures.map((texture) => (
                <Grid xl={6} lg={6} md={6} sm={12} xs={12} key={texture.id}>
                  <QualityAttribute
                    iconPath={texture.iconPath}
                    label={texture.label}
                    description={texture.description}
                    isSelected={watch("texture") === texture.id}
                    onClick={onClickTexture}
                    isNotSelected={textureIsNotSelected(texture.id)}
                    value={texture.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
          <Section gap={1}>
            <Text variant="body1Bold">Pain Depth</Text>
            <Grid container spacing={1}>
              {depths.map((depth) => (
                <Grid xl={6} lg={6} md={6} sm={12} xs={12} key={depth.id}>
                  <QualityAttribute
                    iconPath={depth.iconPath}
                    label={depth.label}
                    description={depth.description}
                    iconSize={36}
                    isSelected={watch("depth") === depth.id}
                    onClick={onClickDepth}
                    isNotSelected={depthIsNotSelected(depth.id)}
                    value={depth.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
          <Section gap={1}>
            <Text variant="body1Bold">Anatomical Location of Pain</Text>
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
            label="Comments"
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

  ${media.up.tablet`
    width: 100%;
  `}
`;

const SelectionSession = styled(FlexColumn)`
  width: 60%;
  ${media.up.tablet`
    width: 100%;
  `}
`;

const Container = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;

  ${media.up.tablet`
    flex-direction: column;
  `}
`;

import { QualityAttribute } from "@components/QualityAttribute";
import { IconsPath } from "@utils/icons";
import styled from "styled-components";
import Grid from "@mui/material/Unstable_Grid2";
import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import Image from "next/image";
import { TextField } from "@components/TextField";
import { TextArea } from "@components/TextArea";
import { useState } from "react";

const textures = [
  {
    id: 1,
    iconPath: IconsPath.texture.Stretching,
    label: "Stretching",
    description: "twist, tear, rip, etc.",
  },
  {
    id: 2,
    iconPath: IconsPath.texture.Stinging,
    label: "Stinging",
    description: "needles,cut,cold,itch",
  },
  {
    id: 3,
    iconPath: IconsPath.texture.Burning,
    label: "Burning",
    description: "acid, caustic, scolding",
  },
  {
    id: 4,
    iconPath: IconsPath.texture.Pressing,
    label: "Pressing",
    description: "crushing, squeezing, tight",
  },
];

const depths = [
  {
    id: 1,
    iconPath: IconsPath.depth.Muscular,
    label: "Muscular",
    description: "from the muscles",
  },
  {
    id: 2,
    iconPath: IconsPath.depth.Visceral,
    label: "Visceral",
    description: "from the organs",
  },
  {
    id: 3,
    iconPath: IconsPath.depth.Superficial,
    label: "Superficial",
    description: "from the skin",
  },
  {
    id: 4,
    iconPath: IconsPath.depth.Bone,
    label: "Bone",
    description: "from bones, or joints",
  },
];

export const QualityPage = () => {
  const [selectedTexture, setSelectedTexture] = useState<number | null>(null);

  const [selectedDepth, setSelectedDepth] = useState<number | null>(null);

  const handleTextureClick = (id: number) => {
    if (selectedTexture === id) {
      setSelectedTexture(null);
    } else {
      setSelectedTexture(id);
    }
  };

  const handleDepthClick = (id: number) => {
    if (selectedDepth === id) {
      setSelectedDepth(null);
    } else {
      setSelectedDepth(id);
    }
  };

  const isTexureSelected = (id: number) => selectedTexture === id;

  const isDepthSelected = (id: number) => selectedDepth === id;

  const isTextureNotSelected = (id: number) =>
    selectedTexture !== null && selectedTexture !== id;

  const isDepthNotSelected = (id: number) =>
    selectedDepth !== null && selectedDepth !== id;

  return (
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
                  onClick={() => handleTextureClick(texture.id)}
                  isSelected={isTexureSelected(texture.id)}
                  isNotSelected={isTextureNotSelected(texture.id)}
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
                  onClick={() => handleDepthClick(depth.id)}
                  isSelected={isDepthSelected(depth.id)}
                  isNotSelected={isDepthNotSelected(depth.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section gap={1}>
          <Text variant="body1Bold">Anatomy</Text>
          <FlexRow justify="flex-start">
            <Image
              src={IconsPath.depth.Anatomy}
              width={32}
              height={32}
              alt={`Attribute Anatomy Icon`}
            />
            <TextField fullWidth />
          </FlexRow>
        </Section>
      </SelectionSession>
      <CommentSection justify="flex-start">
        <TextArea
          label="Comment"
          placeholder="Write something..."
          minRows={25}
          maxRows={25}
        />
      </CommentSection>
    </Container>
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

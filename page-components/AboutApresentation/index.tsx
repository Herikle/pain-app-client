import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { IconsPath } from "@utils/icons";
import Image from "next/image";
import styled from "styled-components";

type AboutApresentationProps = {
  title?: string;
  description: string;
  image: string;
  social: {
    web?: string;
    linkedin?: string;
    mail?: string;
  };
};

const IconsMap = {
  web: IconsPath.Web,
  linkedin: IconsPath.Linkedin,
  mail: IconsPath.Mail,
};

export const AboutApresentation = ({
  title,
  description,
  image,
  social,
}: AboutApresentationProps) => {
  return (
    <FlexRow gap={2} align="center">
      <FlexColumn gap={1} align="center" width="300px">
        {title && <Text variant="h2">{title}</Text>}
        <ImageStyled width={180} height={180} alt={title} src={image} />
      </FlexColumn>
      <FlexColumn width="390px" justify="space-between" gap={2}>
        <Text variant="body1">{description}</Text>
        <FlexRow gap={1.5}>
          {Object.keys(social).map((key) => (
            <a
              key={key}
              href={social[key]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image width={20} height={20} src={IconsMap[key]} alt={key} />
            </a>
          ))}
        </FlexRow>
      </FlexColumn>
    </FlexRow>
  );
};

const ImageStyled = styled.img`
  border-radius: 50%;
  object-fit: cover;
`;

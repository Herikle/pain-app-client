import { Text } from "@components/Text";
import { FlexRow } from "design-components/Flex";
import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";
import { IconsPath } from "utils/icons";
import { RoutesPath } from "utils/routes";

export const SideMenuLink = () => {
  return (
    <Link href={RoutesPath.prompt}>
      <FlexRow>
        <Image src={IconsPath.GPT} alt="Chat GPT icon" width="30" height="30" />
        <Text variant="body2Bold" color="pure_white">
          ChatGPT AI
        </Text>
      </FlexRow>
    </Link>
  );
};

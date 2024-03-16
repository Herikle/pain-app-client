import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { media } from "@styles/media-query";
import { ImagesPath } from "@utils/icons";
import { RoutesPath } from "@utils/routes";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const MessageSentSuccess = () => {
  return (
    <Container gap={3} align="center">
      <Image
        src={ImagesPath.MessageSent}
        alt="Message sent"
        width={285}
        height={267}
      />
      <Text variant="h1" align="center" color="font_color">
        Message sent!
      </Text>
      <Text variant="h3" align="center" fontWeight="400">
        Thanks for your contact. We will reply as soon as we can.
      </Text>
      <Link href={RoutesPath.home} style={{ width: "100%" }}>
        <Button fullWidth>Go to homepage</Button>
      </Link>
    </Container>
  );
};

export const MessageSentError = () => {
  return (
    <Container gap={3} align="center">
      <Image
        src={ImagesPath.MessageError}
        alt="Message sent"
        width={155}
        height={155}
      />
      <Text variant="h1" align="center" color="font_color">
        Error white sending message
      </Text>
      <Text variant="h3" align="center" fontWeight="400">
        {"Don't worry, It's our fault. Please try again later."}
      </Text>
      <Button fullWidth>Retry</Button>
      <Link href={RoutesPath.home} style={{ width: "100%" }}>
        <Button
          fullWidth
          variant="text"
          textColor="font_color"
          color="pure_white"
        >
          Go to homepage
        </Button>
      </Link>
    </Container>
  );
};

const Container = styled(FlexColumn)`
  width: 600px;

  ${media.up.tablet`
    width: 100%;
    padding-inline: 1rem;
  `}
`;

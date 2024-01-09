import { BackgroundVideo } from "@components/BackgroundHomeVideo";
import { Text } from "@components/Text";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { FlexColumn } from "@design-components/Flex";
import { GuestLayout } from "@layouts/GuestLayout";
import { AboutApresentation } from "@page-components/AboutApresentation";
import { media } from "@styles/media-query";
import { theme } from "@styles/theme";
import styled from "styled-components";

export default function About() {
  return (
    <GuestLayout>
      <Container>
        <Text variant="h1">Credits</Text>
        <FlexColumn mt={2}>
          <AboutApresentation
            title="PainTrack Method"
            image="https://placehold.co/600x400"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            risus pharetra, feugiat lorem et, imperdiet orci. Fusce tempor erat
            nec diam molestie sodales. Ut euismod eu lacus nec scelerisque. Morbi
            in aliquet risus, vitae mollis risus. Nam pretium id nibh id bibendum."
            social={{
              web: "https://www.google.com",
              linkedin: "https://www.google.com",
              mail: "https://www.google.com",
            }}
          />
          <Hr />
          <FlexColumn gap={2}>
            <AboutApresentation
              title="Design & UI"
              image="https://placehold.co/600x400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            risus pharetra, feugiat lorem et, imperdiet orci. Fusce tempor erat
            nec diam molestie sodales. Ut euismod eu lacus nec scelerisque. Morbi
            in aliquet risus, vitae mollis risus. Nam pretium id nibh id bibendum."
              social={{
                web: "https://www.google.com",
                linkedin: "https://www.google.com",
                mail: "https://www.google.com",
              }}
            />
            <AboutApresentation
              image="https://placehold.co/600x400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            risus pharetra, feugiat lorem et, imperdiet orci. Fusce tempor erat
            nec diam molestie sodales. Ut euismod eu lacus nec scelerisque. Morbi
            in aliquet risus, vitae mollis risus. Nam pretium id nibh id bibendum."
              social={{
                web: "https://www.google.com",
                linkedin: "https://www.google.com",
                mail: "https://www.google.com",
              }}
            />
          </FlexColumn>
          <FlexColumn gap={2} mt={1}>
            <AboutApresentation
              title="Front-end Development"
              image="https://placehold.co/600x400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            risus pharetra, feugiat lorem et, imperdiet orci. Fusce tempor erat
            nec diam molestie sodales. Ut euismod eu lacus nec scelerisque. Morbi
            in aliquet risus, vitae mollis risus. Nam pretium id nibh id bibendum."
              social={{
                web: "https://www.google.com",
                linkedin: "https://www.google.com",
                mail: "https://www.google.com",
              }}
            />
          </FlexColumn>
          <FlexColumn gap={2} mt={1}>
            <AboutApresentation
              title="Back-end Development"
              image="https://placehold.co/600x400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
            risus pharetra, feugiat lorem et, imperdiet orci. Fusce tempor erat
            nec diam molestie sodales. Ut euismod eu lacus nec scelerisque. Morbi
            in aliquet risus, vitae mollis risus. Nam pretium id nibh id bibendum."
              social={{
                web: "https://www.google.com",
                linkedin: "https://www.google.com",
                mail: "https://www.google.com",
              }}
            />
          </FlexColumn>
        </FlexColumn>
      </Container>
    </GuestLayout>
  );
}

const Hr = styled.hr`
  margin-top: 1rem;
  border: ${theme.colors.hover_state} 1px solid;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  padding-top: 2rem;
  margin-inline: auto;
  width: fit-content;
  margin-bottom: 2rem;
  ${media.up.tablet`
    width:100%;
    margin-inline: unset;
    padding-inline: 1rem;
  `};
`;

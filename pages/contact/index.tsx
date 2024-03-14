import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { GuestLayout } from "@layouts/GuestLayout";
import { ContactForm } from "@page-components/ContactForm";
import styled from "styled-components";

export default function ContactPage() {
  return (
    <GuestLayout>
      <Container>
        <ContactForm />
      </Container>
    </GuestLayout>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS * 2}px);
`;

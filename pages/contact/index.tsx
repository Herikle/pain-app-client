import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { GuestLayout } from "@layouts/GuestLayout";
import { ContactForm } from "@page-components/ContactForm";
import {
  MessageSentError,
  MessageSentSuccess,
} from "@page-components/MessageSent";
import { useState } from "react";
import styled from "styled-components";

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  const onRetry = () => {
    setIsError(false);
  };

  const getPageComponent = () => {
    if (isSuccess) {
      return <MessageSentSuccess />;
    }
    if (isError) {
      return <MessageSentError onRetry={onRetry} />;
    }

    return <ContactForm onSuccess={handleSuccess} onError={handleError} />;
  };

  return (
    <GuestLayout>
      <Container>{getPageComponent()}</Container>
    </GuestLayout>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 4rem;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS * 2}px);
`;

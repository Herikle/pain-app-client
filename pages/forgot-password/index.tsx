import Router from "next/router";
import styled from "styled-components";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { Login, LoginPayload } from "@page-components/Login";
import { LogInPayload, useLogIn } from "@queries/auth/useAuth";
import { theme } from "@styles/theme";
import { GuestLayout } from "@layouts/GuestLayout";
import { useGuest } from "@utils/hooks/useAuth";
import { useRecoveryPassword } from "@queries/account/useAccount";
import { ForgotPassword } from "@page-components/ForgotPassoword";
import { useState } from "react";
import { EmailSent } from "@page-components/ForgotPassoword/EmailSent";

export default function LoginPage() {
  useGuest();

  const [savedEmail, setSavedEmail] = useState<string | undefined>(undefined);

  const [showEmailSent, setShowEmailSent] = useState(false);

  const recoveryPassword = useRecoveryPassword();

  const onSubmit = async (payload: LoginPayload) => {
    setSavedEmail(payload.email);
    await recoveryPassword.mutateAsync({
      email: payload.email,
    });
    setShowEmailSent(true);
  };

  return (
    <GuestLayout>
      <Container>
        <FormContainer>
          {showEmailSent ? (
            <EmailSent
              onResendClick={() => {
                setShowEmailSent(false);
              }}
            />
          ) : (
            <ForgotPassword
              onSubmit={onSubmit}
              defaultEmail={savedEmail}
              loading={recoveryPassword.isLoading}
            />
          )}
        </FormContainer>
      </Container>
    </GuestLayout>
  );
}

const FormContainer = styled.div`
  width: 370px;
`;

const Divisor = styled.div`
  width: 2px;
  background-color: ${theme.colors.secondary_font};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10rem;
  height: 100%;
  min-height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS * 2}px);
  padding-block: 3rem;
`;

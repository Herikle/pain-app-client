import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar/consts";
import { GuestLayout } from "@layouts/GuestLayout";
import { useGuest } from "@utils/hooks/useAuth";
import {
  ResetPasswordForm,
  ResetPasswordPayload,
} from "@page-components/ResetPasswordForm";
import validator from "validator";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useResetPassword } from "@queries/account/useAccount";
import { RoutesPath } from "@utils/routes";

export default function ResetPassword() {
  useGuest();

  const router = useRouter();

  const { token } = router.query as { token: string };

  useEffect(() => {
    if (token) {
      const isUuid = validator.isUUID(token);
      if (!isUuid) {
        toast.error("Invalid token");
        Router.push("/");
      }
    }
  }, [token]);

  const resetPassword = useResetPassword();

  const onSubmit = async (payload: ResetPasswordPayload) => {
    await resetPassword.mutateAsync({
      body: {
        password_confirm: payload.confirmPassword,
        password: payload.password,
        token,
      },
    });
    Router.push(RoutesPath.login);
  };

  return (
    <GuestLayout>
      <Container>
        <FormContainer>
          <ResetPasswordForm
            onSubmit={onSubmit}
            loading={resetPassword.isLoading}
          />
        </FormContainer>
      </Container>
    </GuestLayout>
  );
}

const FormContainer = styled.div`
  width: 370px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10rem;
  height: 100%;
  min-height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS * 2}px);
  padding-block: 3rem;
`;

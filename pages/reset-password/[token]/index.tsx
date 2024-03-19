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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useResetPassword } from "@queries/account/useAccount";
import { RoutesPath } from "@utils/routes";
import { FlexColumn } from "@design-components/Flex";
import { Text } from "@components/Text";
import Image from "next/image";
import { ImagesPath } from "@utils/icons";
import { Button } from "@components/Button";
import Link from "next/link";

export default function ResetPassword() {
  useGuest();

  const router = useRouter();

  const { token } = router.query as { token: string };

  const [isSubmited, setIsSubmited] = useState(false);

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
    setIsSubmited(true);
  };

  return (
    <GuestLayout>
      <Container>
        <FormContainer>
          {isSubmited ? (
            <FlexColumn
              gap={2}
              align="center"
              width="300px"
              marginInline="auto"
            >
              <Text variant="h1">All set!</Text>
              <Text variant="body2">You can use your new password now.</Text>
              <Image
                width={250}
                height={250}
                alt="All set"
                src={ImagesPath.PeaceOfMindoBro}
              />
              <Link href={RoutesPath.login} style={{ width: "100%" }}>
                <Button variant="contained" color="primary" fullWidth>
                  Access your account
                </Button>
              </Link>
            </FlexColumn>
          ) : (
            <ResetPasswordForm
              onSubmit={onSubmit}
              loading={resetPassword.isLoading}
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10rem;
  height: 100%;
  min-height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS * 2}px);
  padding-block: 3rem;
`;

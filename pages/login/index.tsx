import Router from "next/router";
import styled from "styled-components";
import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar";
import { Login } from "@page-components/Login";
import { useLogIn } from "@queries/auth/useAuth";
import { theme } from "@styles/theme";
import { GuestLayout } from "@layouts/GuestLayout";
import { useGuest } from "@utils/hooks/useAuth";
import { RoutesPath } from "@utils/routes";

export default function LoginPage() {
  useGuest();

  const logIn = useLogIn();

  const onSubmitLogin = async (payload: any) => {
    await logIn.mutateAsync({
      body: payload,
    });
    Router.push(RoutesPath.profile);
  };

  return (
    <GuestLayout>
      <Container>
        <FormContainer>
          <Login onSubmit={onSubmitLogin} loading={logIn.isLoading} />
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

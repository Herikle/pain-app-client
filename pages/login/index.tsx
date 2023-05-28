import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar";
import { Login, LoginPayload } from "@page-components/Login";
import { Register, RegisterPayload } from "@page-components/Register";
import { useLogIn, useSignUp } from "@queries/auth/useAuth";
import { theme } from "@styles/theme";
import { GuestLayout } from "layouts/GuestLayout";
import styled from "styled-components";
import { useGuest } from "utils/hooks/useAuth";

export default function LoginPage() {
  useGuest();

  const signUp = useSignUp();

  const logIn = useLogIn();

  const onSubmitRegister = async (payload: RegisterPayload) => {
    await signUp.mutateAsync({
      body: payload,
    });
  };

  const onSubmitLogin = async (payload: LoginPayload) => {
    await logIn.mutateAsync({
      body: payload,
    });
  };

  return (
    <GuestLayout>
      <Container>
        <FormContainer>
          <Login onSubmit={onSubmitLogin} loading={logIn.isLoading} />
        </FormContainer>
        <Divisor />
        <FormContainer>
          <Register onSubmit={onSubmitRegister} loading={signUp.isLoading} />
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

import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar";
import { Login } from "@page-components/Login";
import { Register, RegisterPayload } from "@page-components/Register";
import { useSignUp } from "@queries/auth/useAuth";
import { theme } from "@styles/theme";
import { GuestLayout } from "layouts/GuestLayout";
import styled from "styled-components";

export default function LoginPage() {
  const signUp = useSignUp();

  const onSubmitRegister = (payload: RegisterPayload) => {
    signUp.mutateAsync({
      body: payload,
    });
  };

  return (
    <GuestLayout>
      <Container>
        <FormContainer>
          <Login />
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

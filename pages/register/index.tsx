// import { TOP_BAR_HEIGHT_PIXELS } from "@components/TopBar";
// import { Register } from "@page-components/Register";
// import { useSignUp } from "@queries/auth/useAuth";
// import { GuestLayout } from "layouts/GuestLayout";
// import Router from "next/router";
// import styled from "styled-components";
// import { useGuest } from "utils/hooks/useAuth";
// import { RoutesPath } from "utils/routes";

// export default function RegisterPage() {
//   useGuest();

//   const signUp = useSignUp();

//   const onSubmitRegister = async (payload: any) => {
//     await signUp.mutateAsync({
//       body: payload,
//     });
//     Router.push(RoutesPath.profile);
//   };

//   return (
//     <GuestLayout>
//       <Container>
//         <FormContainer>
//           <Register onSubmit={onSubmitRegister} loading={signUp.isLoading} />
//         </FormContainer>
//       </Container>
//     </GuestLayout>
//   );
// }

// const FormContainer = styled.div`
//   width: 370px;
// `;

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10rem;
//   height: 100%;
//   min-height: calc(100vh - ${TOP_BAR_HEIGHT_PIXELS * 2}px);
//   padding-block: 3rem;
// `;

export default function Generic() {
  return <></>;
}

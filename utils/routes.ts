const ProtectedRoutes = {
  new_prompt: "/prompt",
  profile: "/profile",
  new_patient: "/patient",
  patient: "/patient/[id]",
  episode: "/episode/[id]",
  prompt: "/prompt/[id]",
};

const PublicRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgot_password: "/forgot-password",
};

export const RoutesPath = {
  ...ProtectedRoutes,
  ...PublicRoutes,
};

export const ProtectedRoutesPath = Object.values(ProtectedRoutes);

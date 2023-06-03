const ProtectedRoutes = {
  prompt: "/prompt",
  profile: "/profile",
  new_patient: "/patient",
};

const PublicRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
};

export const RoutesPath = {
  ...ProtectedRoutes,
  ...PublicRoutes,
};

export const ProtectedRoutesPath = Object.values(ProtectedRoutes);

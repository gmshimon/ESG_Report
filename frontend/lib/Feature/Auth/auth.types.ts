export interface User {
  id: string;
  name: string;
  email: string;
  organizationId: string;
  role: string;
}

export type SignupInfo = {
  name: string
  email: string
  password: string
  organization: {
    name: string
    slug: string
    industry?: string
    country?: string
    website?: string
    description?: string
  }
}

export type LoginInfo = {
  email: string;
  password: string;
};

export interface AuthState {
  user: User | null;
  isLoginLoading: boolean;
  isLoginError: boolean;
  isLoginSuccess: boolean;
  isFetchUserDataLoading: boolean;
  isFetchUserDataError: boolean;
  isFetchUserDataSuccess: boolean;
  isCreateUserLoading: boolean;
  isCreateUserError: boolean;
  isCreateUserSuccess: boolean;
  errorMessage?: string; // Helpful for UI feedback
}
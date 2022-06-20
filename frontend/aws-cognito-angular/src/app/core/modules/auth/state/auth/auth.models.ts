import { CognitoUser } from '@aws-amplify/auth';

export interface SignInInput {
  username: string;
  password: string;
}

export interface SignUpInput {
  username: string;
  password: string;
  name: string;
  company: string;
  role: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordInput {
  username: string;
}

export interface ConfirmPasswordResetInput {
  username: string;
  code: string;
  password: string;
}

export interface ConfirmSignUpInput {
  username: string;
  code: string;
}

export interface AuthState {
  isLoggedIn: boolean;
}

export interface ResendConfirationCodeInput {
  username: string;
}

export interface ISignUpResult {
  user: CognitoUser;
  userConfirmed: boolean;
  userSub: string;
}

import { Injectable } from '@angular/core';
import { Auth } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async getCurrentUser() {
    return Auth.currentAuthenticatedUser();
  }

  async signUp(
    username: string,
    password: string,
    attributes: Record<string, string>
  ) {
    return await Auth.signUp({
      username,
      password,
      attributes,
    });
  }

  async confirmSignUp(username: string, code: string) {
    await Auth.confirmSignUp(username, code);
  }

  async resendConfirmationCode(username: string) {
    await Auth.resendSignUp(username);
  }

  async signIn(username: string, password: string) {
    return await Auth.signIn(username, password);
  }

  async resetPassword(username: string) {
    await Auth.forgotPassword(username);
  }

  async confirmPassword(username: string, code: string, newPassword: string) {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const user = await Auth.currentAuthenticatedUser();
    return Auth.changePassword(user, currentPassword, newPassword);
  }

  async getUserAttributes() {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    return attributes;
  }

  async updateUserAttributes(attributes: Record<string, string>) {
    const user = await Auth.currentAuthenticatedUser();

    await Auth.updateUserAttributes(user, attributes);
  }

  async signOut() {
    Auth.signOut();
  }
}

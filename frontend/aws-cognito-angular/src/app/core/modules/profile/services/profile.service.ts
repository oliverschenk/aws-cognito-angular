import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/modules/auth/services';
import { UpdateUserProfileInput, UserProfile } from '../state/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public userProfile: UserProfile;

  constructor(private authService: AuthService) {}

  async getUserProfile(): Promise<UserProfile> {
    const attributes = await this.authService.getUserAttributes();

    const userProfile = {
      phoneNumber: attributes.phone_number,
      name: attributes.name,
      company: attributes['custom:company'],
      role: attributes['custom:role_name'],
    };

    return userProfile;
  }

  async updateUserProfile(updatedUserProfile: UpdateUserProfileInput) {
    const attributes = {
      name: updatedUserProfile.name,
      'custom:company': updatedUserProfile.company,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'custom:role_name': updatedUserProfile.role,
    };

    await this.authService.updateUserAttributes(attributes);
  }
}

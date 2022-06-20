import { NgModule } from '@angular/core';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../../auth.module';

@NgModule({
  imports: [SharedModule, ChangePasswordPageRoutingModule, AuthModule],
  declarations: [ChangePasswordPage],
})
export class ChangePasswordPageModule {}

import { NgModule } from '@angular/core';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../../auth.module';

@NgModule({
  imports: [SharedModule, ResetPasswordPageRoutingModule, AuthModule],
  declarations: [ResetPasswordPage],
})
export class ResetPasswordPageModule {}

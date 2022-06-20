import { NgModule } from '@angular/core';

import { ConfirmPasswordPageRoutingModule } from './confirm-password-routing.module';

import { ConfirmPasswordPage } from './confirm-password.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, ConfirmPasswordPageRoutingModule],
  declarations: [ConfirmPasswordPage],
})
export class ConfirmPasswordPageModule {}

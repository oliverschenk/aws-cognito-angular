import { NgModule } from '@angular/core';

import { ConfirmSignupPageRoutingModule } from './confirm-signup-routing.module';

import { ConfirmSignupPage } from './confirm-signup.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ConfirmSignupPageRoutingModule
  ],
  declarations: [ConfirmSignupPage]
})
export class ConfirmSignupPageModule {}

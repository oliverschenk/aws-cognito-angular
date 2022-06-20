import { NgModule } from '@angular/core';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../../auth.module';

@NgModule({
  imports: [SharedModule, SignupPageRoutingModule, AuthModule],
  declarations: [SignupPage],
})
export class SignupPageModule {}

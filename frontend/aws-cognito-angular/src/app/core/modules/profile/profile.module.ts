import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { EFFECTS, reducers } from './state';

@NgModule({
  imports: [
    SharedModule,
    ProfilePageRoutingModule,
    StoreModule.forFeature('profileModule', reducers),
    EffectsModule.forFeature(EFFECTS),
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}

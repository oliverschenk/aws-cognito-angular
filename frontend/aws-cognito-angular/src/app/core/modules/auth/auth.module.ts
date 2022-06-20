import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { EFFECTS, reducers } from './state';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('authModule', reducers),
    EffectsModule.forFeature(EFFECTS),
  ],
})
export class AuthModule {}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EnsureImportedOnceModule } from './ensure-imported-once.module';

import { AuthModule } from './modules/auth/auth.module';
import { metaReducers, reducers } from './state';
import { EFFECTS } from './state';

// imports: imports the module's exports. which is usually declarables and providers
// in our case the spinner has no providers.
//
// exports: exports modules AND components/directives/pipes that other modules may want to use
@NgModule({
  imports: [
    CommonModule,

    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot(EFFECTS),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),

    AuthModule,

    IonicModule.forRoot(),
  ],
  exports: [CommonModule, IonicModule],
  declarations: [],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class CoreModule extends EnsureImportedOnceModule {
  public constructor(@SkipSelf() @Optional() parent: CoreModule) {
    super(parent);
  }
}

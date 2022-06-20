import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Auth } from '@aws-amplify/auth';

if (environment.production) {
  enableProdMode();
}

// Configure Amplify
Auth.configure({
  region: environment.cognitoRegion,
  userPoolId: environment.cognitoUserPoolId,
  userPoolWebClientId: environment.cognitoAppClientId,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

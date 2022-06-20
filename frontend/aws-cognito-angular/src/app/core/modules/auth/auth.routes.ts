import { Routes } from '@angular/router';
import { AuthGuard, UnauthGuard } from './services';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninPageModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'confirm-signup',
    loadChildren: () =>
      import('./pages/confirm-signup/confirm-signup.module').then(
        (m) => m.ConfirmSignupPageModule
      ),
    canActivate: [UnauthGuard],
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
    canActivate: [UnauthGuard],
  },
  {
    path: 'confirm-password',
    loadChildren: () =>
      import('./pages/confirm-password/confirm-password.module').then(
        (m) => m.ConfirmPasswordPageModule
      ),
    canActivate: [UnauthGuard],
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
    canActivate: [AuthGuard]
  },
];


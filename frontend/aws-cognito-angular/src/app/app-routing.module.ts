import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authRoutes } from './core/modules/auth/auth.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      ...authRoutes
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./core/modules/profile/profile.module').then((m) => m.ProfilePageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

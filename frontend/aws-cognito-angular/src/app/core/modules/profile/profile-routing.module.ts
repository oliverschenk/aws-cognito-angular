import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/modules/auth/services';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/editprofile/editprofile.module').then(
        (m) => m.EditprofilePageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}

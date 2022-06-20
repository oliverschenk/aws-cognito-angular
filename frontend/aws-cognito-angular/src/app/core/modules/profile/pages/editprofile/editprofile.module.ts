import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditprofilePageRoutingModule } from './editprofile-routing.module';

import { EditprofilePage } from './editprofile.page';

@NgModule({
  imports: [
    SharedModule,
    EditprofilePageRoutingModule
  ],
  declarations: [EditprofilePage]
})
export class EditprofilePageModule {}

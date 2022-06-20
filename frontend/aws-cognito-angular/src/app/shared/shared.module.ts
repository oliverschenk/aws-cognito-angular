import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { COMPONENTS } from '../components';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  exports: [CommonModule, ReactiveFormsModule, IonicModule, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class SharedModule {}

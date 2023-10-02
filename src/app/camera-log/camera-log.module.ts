import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraLogPageRoutingModule } from './camera-log-routing.module';

import { CameraLogPage } from './camera-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraLogPageRoutingModule
  ],
  declarations: [CameraLogPage]
})
export class CameraLogPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraLogPage } from './camera-log.page';

const routes: Routes = [
  {
    path: '',
    component: CameraLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraLogPageRoutingModule {}

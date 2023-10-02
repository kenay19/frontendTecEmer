import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonadorPage } from './donador.page';

const routes: Routes = [
  {
    path: '',
    component: DonadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonadorPageRoutingModule {}

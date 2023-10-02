import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitantePageRoutingModule } from './solicitante-routing.module';

import { SolicitantePage } from './solicitante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitantePageRoutingModule
  ],
  declarations: [SolicitantePage]
})
export class SolicitantePageModule {}

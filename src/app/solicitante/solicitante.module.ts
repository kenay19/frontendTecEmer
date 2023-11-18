import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitantePageRoutingModule } from './solicitante-routing.module';

import { SolicitantePage } from './solicitante.page';
import { FormularioSolicitudComponent } from '../components/formulario-solicitud/formulario-solicitud.component';
import { ListadoSolicitanteComponent } from '../components/listado-solicitante/listado-solicitante.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitantePageRoutingModule
  ],
  declarations: [SolicitantePage,FormularioSolicitudComponent,ListadoSolicitanteComponent]
})
export class SolicitantePageModule {}

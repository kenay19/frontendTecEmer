import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonadorPageRoutingModule } from './donador-routing.module';
import {ListadoDonadorComponent} from '../components/listado-donador/listado-donador.component';
import {FormularioDonadorComponent} from '../components/formulario-donador/formulario-donador.component'
import { DonadorPage } from './donador.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonadorPageRoutingModule
  ],
  declarations: [DonadorPage,ListadoDonadorComponent,FormularioDonadorComponent]
})
export class DonadorPageModule {}

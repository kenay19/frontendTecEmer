import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendedorPageRoutingModule } from './vendedor-routing.module';

import { VendedorPage } from './vendedor.page';
import { ListadoVendedorComponent } from '../components/listado-vendedor/listado-vendedor.component';
import { FormularioVendedorComponent } from '../components/formulario-vendedor/formulario-vendedor.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendedorPageRoutingModule
  ],
  declarations: [VendedorPage,ListadoVendedorComponent,FormularioVendedorComponent]
})
export class VendedorPageModule {}

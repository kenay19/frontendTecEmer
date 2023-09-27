import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroUsuariosPageRoutingModule } from './registro-usuarios-routing.module';

import { RegistroUsuariosPage } from './registro-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroUsuariosPageRoutingModule
  ],
  declarations: [RegistroUsuariosPage]
})
export class RegistroUsuariosPageModule {}

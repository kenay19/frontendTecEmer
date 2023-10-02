import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonadorPageRoutingModule } from './donador-routing.module';

import { DonadorPage } from './donador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonadorPageRoutingModule
  ],
  declarations: [DonadorPage]
})
export class DonadorPageModule {}

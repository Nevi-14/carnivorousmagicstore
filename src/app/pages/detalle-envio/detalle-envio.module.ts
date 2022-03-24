import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEnvioPageRoutingModule } from './detalle-envio-routing.module';

import { DetalleEnvioPage } from './detalle-envio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEnvioPageRoutingModule
  ],
  declarations: [DetalleEnvioPage]
})
export class DetalleEnvioPageModule {}

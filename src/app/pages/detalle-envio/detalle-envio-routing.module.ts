import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleEnvioPage } from './detalle-envio.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleEnvioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleEnvioPageRoutingModule {}

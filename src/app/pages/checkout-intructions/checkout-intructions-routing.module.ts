import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutIntructionsPage } from './checkout-intructions.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutIntructionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutIntructionsPageRoutingModule {}

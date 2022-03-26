import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutIntructionsPageRoutingModule } from './checkout-intructions-routing.module';

import { CheckoutIntructionsPage } from './checkout-intructions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutIntructionsPageRoutingModule
  ],
  declarations: [CheckoutIntructionsPage]
})
export class CheckoutIntructionsPageModule {}

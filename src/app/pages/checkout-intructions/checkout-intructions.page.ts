import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout-intructions',
  templateUrl: './checkout-intructions.page.html',
  styleUrls: ['./checkout-intructions.page.scss'],
  styles: [
    `
  
    #mapa {
      height:100%;
     width:100%;
  
    }

    `
  ]
})
export class CheckoutIntructionsPage implements OnInit {

  constructor(
public modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }

}

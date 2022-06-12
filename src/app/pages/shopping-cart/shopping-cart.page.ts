import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  imageURL = 'http://192.168.100.8:4000/show_images/?file=';
  constructor(
    public modalCtrl: ModalController,
    public router: Router,
    public storeService:StoreService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {


  }

  //`<img src="${item.image}" style="border-radius: 2px">`
 async deleteItem(item){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-alert',
      header: 'Alert!',
      message:' Do you want to delete ' + item.title +' from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
         
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            const i  = this.storeService.myShoppingCart.findIndex(producto => producto.id == item.id);
            this.storeService.myShoppingCart.splice(i,1)

            if(this.storeService.myShoppingCart.length == 0){
              this.modalCtrl.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();

   
    }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  checkOut(){
this.cerrarModal();
    this.router.navigate(['/check-out']);
    
  }
}

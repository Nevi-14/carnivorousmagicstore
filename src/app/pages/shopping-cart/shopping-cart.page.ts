import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public router: Router,
    public storeService:StoreService
  ) { }

  ngOnInit() {


  }

  
  deleteItem(item){

    const i  = this.storeService.myShoppingCart.findIndex(producto => producto.id == item.id);
    this.storeService.myShoppingCart.splice(i,1)
   
    }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  checkOut(){
this.cerrarModal();
    this.router.navigate(['/check-out']);
    
  }
}

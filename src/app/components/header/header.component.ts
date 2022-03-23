import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingCartPage } from '../../pages/shopping-cart/shopping-cart.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Input() title:string ;
dropdown = false;
userDropdown= false;
@ViewChild('inicioBtn', {read:ElementRef}) inicioBtn:ElementRef
@ViewChild('inicioBtnUsuario', {read:ElementRef}) inicioBtnUsuario:ElementRef
  constructor(
public modalCtrl: ModalController
  ) { }

  ngOnInit() {}




  hideDropdown(event){

    const xTouch =  event.clientX
    const yTouch = event.clientY

    const rect = this.inicioBtn.nativeElement.getBoundingClientRect();

    const topBoundary = rect.top+2
    const leftBoundary = rect.left+2
    const rightBoundary = rect.right-2

    if(xTouch < leftBoundary ||   xTouch > rightBoundary || yTouch < topBoundary){
      this.dropdown = false;
    }
  }
  async shoppingCart() {
    const modal = await this.modalCtrl.create({
      component: ShoppingCartPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}

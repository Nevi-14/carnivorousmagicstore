import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IonSlides, ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { StoreService } from 'src/app/services/store.service';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart.page';
import { CheckoutIntructionsPage } from '../checkout-intructions/checkout-intructions.page';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  imageURL = 'http://192.168.100.8:4000/show_images/?file=';
  sliderOpts = {
    zoom: false,
    slidesPerView: 4,
    spaceBetween: 10,
    centeredSlides: false,
    // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 40
    },
     // when window width is >= 940px
     940: {
      slidesPerView: 3,
      spaceBetween: 40
    },

     // when window width is >= 1200px
     1300: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  },
  };

  products: Observable<any>;

  constructor(
    public http: HttpClient,
    private modalCtrl: ModalController, private changeDetectorRef: ChangeDetectorRef,
    public storeService:StoreService
  ) { }

  ngOnInit() {
    this.storeService.syncProducts('http://192.168.100.8:4000/api/products');

  //  this.products = this.http.get('https://fakestoreapi.com/products');
  }
  async shoppingCart() {
    const modal = await this.modalCtrl.create({
      component: ShoppingCartPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async openPreview(img) {
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      cssClass: 'transparent-modal',
      componentProps: {
        img
      }
    });
    modal.present();
  }
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    
    this.slides.slideNext();
  }
  @HostListener('window:resize',['$event'])

  private onResize(event){

    const newWidth = event.target.innerWidth;

  
  if (newWidth < 600 ){
//this.storeService.sliderOpts.slidesPerView = 1;
// not woking

  }else{
    //this.storeService.sliderOpts.slidesPerView = 5;

  }
 // alert([newWidth, this.storeService.sliderOpts.slidesPerView])

  }

  addToCart(producto){
    this.storeService.myShoppingCart.push(producto)
    console.log(this.storeService.myShoppingCart)
  }



}

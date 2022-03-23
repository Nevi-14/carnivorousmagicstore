import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IonSlides, ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
 
  products: Observable<any>;
  sliderOpts = {
    zoom: false,
    slidesPerView: 4,
    spaceBetween: 10,
    centeredSlides: false
  };

  constructor(
    public http: HttpClient,
    private modalCtrl: ModalController, private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.products = this.http.get('https://fakestoreapi.com/products');
  }
F
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
//this.sliderOpts.slidesPerView = 1;
// not woking

  }else{
   // this.sliderOpts.slidesPerView = 5;

  }
  

  }
}

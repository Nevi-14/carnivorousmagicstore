import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  products: Observable<any>;
  sliderOpts = {
    zoom: false,
    slidesPerView: 5,
    spaceBetween: 20,
    centeredSlides: false
  };

  constructor(
    public http: HttpClient,
    private modalCtrl: ModalController, private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.products = this.http.get('https://fakestoreapi.com/products');
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
}

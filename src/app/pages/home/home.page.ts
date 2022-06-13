import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart.page';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as  mapboxgl from 'mapbox-gl';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('nuevos') nuevos: IonSlides;
  @ViewChild('exclusivos') exclusivos: IonSlides;
  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!: mapboxgl.Map;
  @ViewChild("video") video: ElementRef; // binds to #video in video.html
videoElement: HTMLVideoElement
  lngLat: [number,number] = [ -84.0907237,9.9725816];
  interactive= true;
  imageURL = 'http://192.168.100.8:4000/show_images/?file=';
  sliderOpts = {
    initialSlide: 0,
    zoom: false,
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: false,
    autoplay:false,
    speed: 500,
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
    
  },
  };
  constructor(
    public http: HttpClient,
    private modalCtrl: ModalController, private changeDetectorRef: ChangeDetectorRef,
    public storeService:StoreService,
    public alertasService: AlertasService
  ) { }

  
  ionViewDidEnter() {
/**
 *    this.videoElement = this.video.nativeElement;
    this.videoElement.play();
 */
 
  }
  ngAfterViewInit() {
 
    this.createMap();
    }
  ngOnInit() {
    this.storeService.syncProducts('https://carnivorousmagic.com/sistema/api/products');
  }
  createMap(){
    if(this.mapa){
  
      this.mapa.remove();
    
      }  
      this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10', // Specify which map style to use
      center:[ -84.1165100,10.0023600],
      zoom:10,
        interactive:this.interactive
      });
  
  
  // Create a default Marker and add it to the map.
  const newMarker = new mapboxgl.Marker({ color:"#010203",  draggable: false})
  newMarker.setLngLat([ -84.1165100,10.0023600])
      .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText("Carnivorous Magic"))
      .addTo(this.mapa)
      .togglePopup()
  
  
  
  this.mapa.addControl(new mapboxgl.NavigationControl());
  
  const geocoder =   new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Buscar zona',
  // Limit seach results to Costa .
  countries: 'cr',
  })
  


  
      this.mapa.on('load', () => {

        this.mapa.resize();
      });
  
    
  }

  async shoppingCart() {
    const modal = await this.modalCtrl.create({
      component: ShoppingCartPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async openPreview(img) {
    this.sliderOpts.autoplay = false;
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      cssClass: 'transparent-modal',
      componentProps: {
        img
      }
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    
    if (data ) {
      this.sliderOpts.autoplay = true;
    }

    
  }
  slidePrevNuevos() {
    this.nuevos.slidePrev();
  }
  slideNextNuevos() {
    
    this.nuevos.slideNext();
  }
  slidePrevExclusivos() {
    this.exclusivos.slidePrev();
  }
  slideNextExclusivos() {
    
    this.exclusivos.slideNext();
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
    this.alertasService.message('Carnivorousmagic','Ups, losentimos!. Nos encontramos trabajando en esta caracteristica');

    return;
    this.storeService.myShoppingCart.push(producto)
    console.log(this.storeService.myShoppingCart)
  }



}

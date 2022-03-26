import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { DetalleEnvioPage } from '../detalle-envio/detalle-envio.page';
import { ModalController } from '@ionic/angular';
import { CheckoutIntructionsPage } from '../checkout-intructions/checkout-intructions.page';
import { DeliveryDetailsPage } from '../delivery-details/delivery-details.page';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit, AfterViewInit {
  @ViewChild('mapa') divMapa!:ElementRef;
  lngLat: [number,number] = [ -84.1165100,10.0023600];
  interactive= true;
  img = 'assets/img/question.svg'
  next = 'assets/img/next.svg'
  mapa!: mapboxgl.Map;
  stepOne = true;
  stepTwo= false;
  stepThree= false;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {

 //this.checkoutIntructions();


  }
 ngAfterViewInit() {
  this.createMap();
  }
  async checkoutIntructions() {
    const modal = await this.modalCtrl.create({
      component: CheckoutIntructionsPage,
      cssClass: 'my-custom-class',
    });
      return await modal.present();
  }
  return(){
    this.stepTwo = false;
    this.stepOne = true;
  }
// MAPBOX  FUNCION
returnstepThree(){
  this.stepThree = false;
  this.stepOne = false;
  this.stepTwo = true;
}

async deliveryDetails() {
  const modal = await this.modalCtrl.create({
    component: DeliveryDetailsPage,
    cssClass: 'my-custom-class'
  });
  return await modal.present();
}


createMap(){
  if(this.mapa){

    this.mapa.remove();
  
    }  
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center:this.lngLat,
    zoom:14,
      interactive:this.interactive
    });


// Create a default Marker and add it to the map.
const newMarker = new mapboxgl.Marker({  draggable: true})
.setLngLat(this.lngLat)
.addTo(this.mapa);


newMarker.on('dragend', ()=>{

  this.returnstepThree();
const { lng, lat } = newMarker!.getLngLat();
this.lngLat  = [lng, lat];

this.createMap();


})

this.mapa.addControl(new mapboxgl.NavigationControl());
//mapa.addControl(new mapboxgl.FullscreenControl());
this.mapa.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: false
}));
const geocoder =   new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
placeholder: 'Buscar zona',
})

this.mapa.addControl(geocoder);




     geocoder.on('result', (e) =>{
      this.stepOne = false;
      this.stepTwo = false;
      this.stepThree = true;
      this.lngLat = e.result.center;
      this.busquedaMapa(e.result);

    
      
    })


    this.mapa.on('load', () => {
      this.mapa.resize();
    });

}
busquedaMapa(resultado) {
  this.createMap();
 console.log(resultado)
 
 }

 setgetCurrentLocation(){
   this.stepOne = false;
   this.stepTwo = true;
this.getCurrentLocation();

 }
 getCurrentLocation(){

  navigator.geolocation.getCurrentPosition(resp => {


this.lngLat  = [resp.coords.longitude,resp.coords.latitude];

this.createMap();



  },
  err => {
    console.log(err);
  });
}
}

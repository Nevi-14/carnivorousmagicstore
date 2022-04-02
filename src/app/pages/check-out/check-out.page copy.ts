import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
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
  coordinates = [];
  features = [];
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
irMarcador(item) {
  if (item) {
    this.mapa.flyTo(
      { center: item, zoom: 12 }
    )

  }
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
    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText("Start Point"))
    .addTo(this.mapa)
    .togglePopup()



this.mapa.addControl(new mapboxgl.NavigationControl());

const geocoder =   new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl,
placeholder: 'Buscar zona',
// Limit seach results to Costa Rica.
countries: 'cr',
})

this.mapa.addControl(geocoder);




     geocoder.on('result', (e) =>{
      this.stepOne = false;
      this.stepTwo = false;
      this.stepThree = true;
      this.lngLat = e.result.center;
      this.coordinates = [];
this.coordinates.push(this.lngLat)

      this.busquedaMapa(e.result);

    
      
    })
    for (const coordinate of this.coordinates) {

      const newMarker = new mapboxgl.Marker({  color:"#428cff", draggable: true})
      .setLngLat(this.lngLat)
      .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setText("End Point"))
      .addTo(this.mapa)
      .togglePopup()
      .addTo(this.mapa);
      
      
      newMarker.on('dragend', ()=>{
      
      const { lng, lat } = newMarker!.getLngLat();
      this.lngLat  = [lng, lat];
this.coordinates = [];
this.coordinates.push(this.lngLat)
this.returnstepThree();
      this.createMap();
      })
      
    }

    this.mapa.on('load', () => {
      this.getRoute()
      this.mapa.resize();
    });

    this.irMarcador(this.coordinates[this.coordinates.length-1])

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
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


  navigator.geolocation.getCurrentPosition(this.success, this.error , options);

}
 success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  this.lngLat  = [crd.longitude , crd.latitude ];
  this.coordinates = [];
  this.coordinates.push(this.lngLat)
this.createMap();

}

 error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
async  getRoute() {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change

  let firstPart =  `https://api.mapbox.com/directions/v5/mapbox/driving/-84.1165100,10.0023600`
   let middle = '';
this.coordinates.forEach(cordinate=>{

  middle += ';'+cordinate


})
  let secondPart = `?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

  let final = firstPart + middle +secondPart;

if(this.coordinates.length > 0){
  const query = await fetch(
    final,
    { method: 'GET' }
  );
  const json = await query.json();
  const waypoints = json.waypoints;
  const start = waypoints[0];
  const end = waypoints[1];
  const distance = (json.routes[0].distance / 1000).toFixed(2) + ' KM';
  const duration =   (json.routes[0].duration / 60).toFixed(2) + ' minutos';

  console.log(start , end, distance, duration, json.waypoints)
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  let geojson :any = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  this.mapa.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: geojson
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#3887be',
      'line-width': 5,
      'line-opacity': 0.75
    }
})
}

}
}

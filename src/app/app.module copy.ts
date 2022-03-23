import { Component, OnInit } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    (mapboxgl as any ).accessToken = environment.mapboxKey;
    console.log(environment.mapboxKey,'jfjfjf')
  }
}

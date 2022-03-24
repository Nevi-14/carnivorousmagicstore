import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class StoreService {
  myShoppingCart = [];

  constructor() { }
}

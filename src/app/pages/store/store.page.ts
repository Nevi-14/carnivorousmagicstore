import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  products: Observable<any>;
  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {

    this.products = this.http.get('https://fakestoreapi.com/products');
  }


}

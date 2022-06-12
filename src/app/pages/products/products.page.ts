import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Observable<any>;
  imageURL = 'http://192.168.100.8:4000/show_images/?file=';
  onError ='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';
  constructor(
    public http: HttpClient,
    public storeService: StoreService
  ) { }

  ngOnInit() {

    this.storeService.syncProducts('http://192.168.100.8:4000/api/products');

   // console.log( this.products,' this.products')
  }

}

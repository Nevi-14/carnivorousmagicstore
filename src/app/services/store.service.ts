import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';

export interface Image {
  id: number;
  product_detail_id: number;
  default: number;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductDetail {
  id: number;
  product_id: number;
  discount_id: number;
  size_id: number;
  status_id: number;
  purchased_price: number;
  suggested_price: number;
  selling_price: number;
  stock: number;
  lock?: any;
  available: number;
  created_at: Date;
  updated_at: Date;
  images: Image[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at?: any;
}

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at?: any;
}

export interface RootObject {
  id: number;
  name: string;
  product_owner: number;
  category_id: number;
  subcategory_id: number;
  long_description: string;
  tax_type_1: string;
  created_by_id: number;
  created_at: Date;
  updated_at: Date;
  product_details: ProductDetail[];
  category: Category;
  subcategory: Subcategory;
}
@Injectable({
  providedIn: 'root'
})


export class StoreService {
  myShoppingCart = [];
  products:RootObject[] = [];
  constructor(private http: HttpClient, public alertasService: AlertasService) { }

  getIRPURL( api: string ){
    let test: string = ''
   /**
    *  if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    */
    const URL = api
    console.log(URL);
        return URL;
  }

  private getProducts(api){
    const URL = this.getIRPURL(api);
    return this.http.get<any[]>( URL );
  }

  syncProducts(provincia){
    this.products = [];
    this.alertasService.presentaLoading('Cargando Datos...');
    this.getProducts(provincia).subscribe(
      resp =>{
        this.alertasService.loadingDissmiss();
        this.products = resp['products'];
       console.log(this.products)
      }

    );
  }

}

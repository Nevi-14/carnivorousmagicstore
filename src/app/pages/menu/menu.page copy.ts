import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { ShoppingCartPage } from '../shopping-cart1/shopping-cart.page1';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {



  menuItems = [

    {
      title:'Home',
      icon:'home-outline',
      path:'/'
    },
    {
      title:'Products',
      icon:'list-outline',
      path:'/products'
    },
    {
      title:'Store',
      icon:'storefront-outline',
      path:'/store'
    },
    {
      title:'Users',
      icon:'people-outline',
      path:'/users'
    },
    {
      title:'Orders',
      icon:'bag-handle-outline',
      path:'/orders'
    },
    {
      title:'Track my Order',
      icon:'search-outline',
      path:'/track-order'
    },
    {
      title:'About',
      icon:'information-outline',
      path:'/about'
    },
    
  ]

  title = '';

 url = this.router.url;
 
  constructor(
    private menuCtrl: MenuController, 
    private plt:Platform,
    public router: Router,
    public modalCtrl: ModalController
    ) { }

  ngOnInit() {
 this.title = this.url.replace(/\//, "")  == '' ? 'Home' : this.url.replace(/\//, "");
  
  const width = this.plt.width();
this.toggleMenu(width)
  }


  setTitle(title){
    this.title = title;
     }




  // REMVOE MENU ON BIGGER SCREENS
  toggleMenu(width){

  if(width > 768){

    this.menuCtrl.enable(false,'myMenu');

  }else{

    this.menuCtrl.enable(true,'myMenu');

  }

  }

  // CHECKS SCREEN RESIZE LIVE

  @HostListener('window:resize',['$event'])

  private onResize(event){

    const newWidth = event.target.innerWidth;

    this.toggleMenu(newWidth);

  }


}

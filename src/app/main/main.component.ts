import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { JwtService } from '../authentication/jwt.service';
import { ProductService } from './product/services/product.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent {

  clientItems: MenuItem[];
  adminItems: MenuItem[];
  name:String = ''; 
  display: boolean = false;
  productsInCart= []
  role: string;
  constructor(private jwtService: JwtService, private productService: ProductService,private router:Router){
    this.role = this.jwtService.getRole()
  }

  ngOnInit() {
    this.name = this.jwtService.getName();
    
      this.clientItems = [
          {
              label:'Prospeum-ecommerce',
          },
          
          {
              label:'Hi '+this.name,
              icon:'pi pi-fw pi-user',
              items:[
                {
                  label:'Profile',
                  routerLink: '/main/user',
                  icon:'pi pi-fw pi-user'
                },
                {
                  label:'Cart',
                  command:() => this.showDialog(),
                  icon:'pi pi-fw pi-shopping-cart'
                },
                {
                  label:'Logout',
                  command:() => this.logout(),
                  icon:'pi pi-fw pi-sign-out'
                }

              ]
          },
      ];

      this.adminItems = [
        {
            label:'Prospeum-ecommerce Admin',
        },
        
        {
            label:'Hi '+this.name,
            icon:'pi pi-fw pi-user',
            items:[
              {
                label:'Profile',
                routerLink: '/main/user',
                icon:'pi pi-fw pi-user'
              },
              {
                label:'Orders',
                routerLink: '/main/products/orders',
                icon:'pi pi-fw pi-shopping-cart'
              },
              {
                label:'Logout',
                command:() => this.logout(),
                icon:'pi pi-fw pi-sign-out'
              }

            ]
        },
    ];
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/sign-in'])
  }
  showDialog() {
    this.getCartData()
    this.display = true;

  }

  getCartData(){
    this.productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
  }

  addOrder(){
    let id = uuid.v4()
    this.productService.addOrder(id,this.jwtService.getUser().email).subscribe(res=>{this.display=false;    localStorage.removeItem('productsInCart')
  })
  }
  }
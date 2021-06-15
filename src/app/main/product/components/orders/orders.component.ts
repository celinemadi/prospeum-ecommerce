import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders = []
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
     this.productService.getOrders().subscribe( res=>{
      this.orders = res
    })
  }

}

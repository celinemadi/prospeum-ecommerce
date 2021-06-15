
import { getAllProducts } from '../../store/product.selectors';
import { State } from '../../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../product.model';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/authentication/jwt.service';
import { ConfirmationService } from 'primeng/api';
import { productActionTypes } from '../../store/product.actions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

  products$: Observable<Product[]> = new Observable();

  productToBeUpdated: Product = new Product();

  isUpdateActivated = false;
  role = '2'
  constructor(private jwtService: JwtService, private router:Router, private productService: ProductService, private store: Store<State>, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.products$ = this.store.select(getAllProducts);
    this.role = this.jwtService.getRole();
  }

  addtocart(product){
   this.productService.addToCart(product)
  }
  details(id){
    this.router.navigate(['/main/produtcts/'+id])
  }

  removeProduct(product:Product){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this product?',
      accept: () => {
         this.deleteProduct(product.id)
      }
  });
  }

  deleteProduct(productId: string) {
    this.store.dispatch(productActionTypes.deleteProduct({productId}));
  }
 
  
}
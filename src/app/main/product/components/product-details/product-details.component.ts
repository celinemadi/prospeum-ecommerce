import { Product } from '../../product.model';
import { createProduct } from '../../store/product.actions';
import { State } from '../../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getAllProducts } from '../../store/product.selectors';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  product;
  constructor(private productService: ProductService, private store: Store<State>,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.store.select(getAllProducts).subscribe(products=>{
        this.product = products.filter(p=> p.id === params.id)[0]
      })
    })
  }
  addtocart(product){
    this.productService.addToCart(product)
   }

  // onSubmit(submittedForm: any) {
  //   console.log(submittedForm.value);

  //   if (submittedForm.invalid) {
  //     return;
  //   }


  //   const product: Product = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
  //   this.store.dispatch(createProduct({product}));

  // }
}
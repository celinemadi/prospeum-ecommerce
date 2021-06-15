import { Product } from '../../product.model';
import { createProduct } from '../../store/product.actions';
import { State } from '../../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { getAllProducts } from '../../store/product.selectors';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { productActionTypes } from '../../store/product.actions';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productId: string;
  product;
  productToBeUpdated: Product = new Product();

  isUpdateActivated = false;
  submitInProgress = false;
  newProduct = false
  productForm: FormGroup
  constructor(private productService: ProductService, private store: Store<State>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {



    this.route.params.subscribe(params => {
      this.store.select(getAllProducts).subscribe(products => {
        this.product = products.filter(p => p.id === params.id)[0];
        if (this.product) {
          this.initializeForm(this.product);
          this.newProduct = false
        }
        else {
          this.newProduct = true
          this.initializeForm()
        }
      })
    })
  }

  initializeForm(product?: Product) {
    this.productForm =  new FormGroup({
      name: new FormControl( product?.name || '', Validators.required),
      price: new FormControl(product?.price || '', [Validators.required, Validators.min(1), Validators.max(100)]),
      availability: new FormControl(product?.availability || '', [Validators.required, Validators.min(0)]),
      size: new FormControl(product?.size || '', [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(product?.description || '', [Validators.required, Validators.maxLength(5000)]),
      calories: new FormControl(product?.calories || ''),
    });
  }
  
 

  updateProduct(updateValues: any) {
    const update: Update<Product> = {
      id: this.product.id,
      changes: {
        ...this.product,
        ...updateValues
      }
    };

    this.store.dispatch(productActionTypes.updateProduct({ update }));

    this.isUpdateActivated = false;
    this.productToBeUpdated = new Product();
  }

  deleteProduct(productId: string) {
    this.store.dispatch(productActionTypes.deleteProduct({ productId }));
  }

  showUpdateForm(product: Product) {
    this.productToBeUpdated = { ...product };
    this.isUpdateActivated = true;
  }

  save(){
    if (this.productForm.invalid) {
      return;
    }
    if(this.newProduct){
     
    const product: Product = { id: uuid.v4(), ...this.productForm.value };
    this.store.dispatch(createProduct({ product }));
    }
    else{
      this.updateProduct(this.productForm.value )
    }
  }
}
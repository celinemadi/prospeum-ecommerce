import { Product } from './../../product.model';
import { createProduct } from './../../store/product.actions';
import { State } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onSubmit(submittedForm: any) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }


    const product: Product = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
    this.store.dispatch(createProduct({product}));

  }
}
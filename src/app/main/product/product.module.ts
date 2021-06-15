import { ProductEffects } from './store/product.effects';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './store/product.reducers';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductResolver } from './product.resolver';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FlexModule } from '@angular/flex-layout';
import {ChipsModule} from 'primeng/chips';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ProductFormComponent } from './components/product-edit/product-form.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { OrdersComponent } from './components/orders/orders.component';
import {TableModule} from 'primeng/table';
const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    resolve: {
      products: ProductResolver
    }
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductResolver
    }
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    resolve: {
      product: ProductResolver
    }
  }

];

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    CardModule,
    ButtonModule,
    FlexModule,
    ChipsModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextareaModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [ConfirmationService,ProductService,ProductResolver],
  bootstrap: [],
  exports: [ProductsListComponent, ProductDetailsComponent]
})
export class ProductModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ProductsListComponent } from './product/components/products-list/products-list.component';
import { ProductDetailsComponent } from './product/components/product-details/product-details.component';
import { ProductResolver } from './product/product.resolver';
import { ProductModule } from './product/product.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
const routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    resolve: {
      products: ProductResolver
    }
  },
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProductModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ProductResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

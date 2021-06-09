import { areProductsLoaded } from './store/product.selectors';
import { loadProducts, productsLoaded } from './store/product.actions';
import { State } from '../store/reducers/index';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

@Injectable()
export class ProductResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areProductsLoaded),
        tap((productsLoaded) => {
          if (!productsLoaded) {
            this.store.dispatch(loadProducts());
          }

        }),
        filter(productsLoaded => productsLoaded),
        first()
    );
  }
}



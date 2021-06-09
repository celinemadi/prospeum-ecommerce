import { Product } from './../product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProductService {

  http: HttpClient;
  baseURL = environment.baseURL;
  productsEndpoint = this.baseURL + '/api/products/'

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsEndpoint);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsEndpoint, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(this.productsEndpoint + productId);
  }

  updateProduct(productId: string | number, changes: Partial<Product>): Observable<any> {
    return this.http.put(this.productsEndpoint + productId, changes);
  }
}
import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/authentication/jwt.service';


@Injectable()
export class ProductService {

  http: HttpClient;
  baseURL = environment.baseURL;
  productsEndpoint = this.baseURL + '/api/products/'
  productsInCart : Product[] = []
  oderEndpoint = this.baseURL + '/api/orders/'
  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsEndpoint);
  }

  getProductById(id): Observable<Product> {
    return this.http.get<Product>(this.productsEndpoint+id);
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
  addToCart(product: Product){
    let existed = false;
    this.productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || []
    this.productsInCart.some(item => {
      if(item.id === product.id){
        item.quantity = item.quantity + 1;
        existed = true
        return true;
      }
      return false
    })
    if(!existed){
      let addproduct = {...product,quantity:1}
      this.productsInCart.push(addproduct)
    }

    localStorage.setItem('productsInCart',JSON.stringify(this.productsInCart))
  }

  addOrder(id,user){
    this.productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
    let products = this.productsInCart.map(element=>{return{'name': element.name,'price':element.price,'quantity':element.quantity}})
    let total = 0;
    products.forEach(p=> total = total + p.price*p.quantity)
    let order = {id:id, products: products, user: user, total: total}

    return this.http.post(this.oderEndpoint, order);


  }

  getOrders() {
    return this.http.get<any[]>(this.oderEndpoint)
  }
}
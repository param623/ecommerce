import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  pathAPI = "http://localhost:3000/products";
  updateProduct: EventEmitter<Product[]> = new EventEmitter();
  constructor(
    private http : HttpClient
  ) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.pathAPI);
  }

  getProductById(id : number):Observable<Product> {
    return this.http.get<any>(this.pathAPI + "/" + id)
  }

  filterProduct(keyword: string):Observable<any> {
    return this.http.get<any>(this.pathAPI+ "?q=" + keyword)
  }
}

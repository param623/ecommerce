import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartItemsService {

  pathAPI = "http://localhost:3000/shippingMethods";
  shoppingCartItems: Product[] = [];
  constructor(
    private _http: HttpClient
  ) { }

  addCartItem = (product: any) => {
    let items = this.getCartItem();
    
    if (items && items != null) {
      const item = items.find((item: any) => {
        return item.id === product.id
      });

      if(item) {
        let index = items.indexOf(item);
        items[index] = product;
      } else {
        items.push(product);
      }
      window.localStorage.setItem('shopping_cart', JSON.stringify(items));
    } else {
      this.shoppingCartItems.push(product);
      window.localStorage.setItem('shopping_cart', JSON.stringify(this.shoppingCartItems));
    }
  }

  getCartItem = () => {
    let items = window.localStorage.getItem('shopping_cart');
    return JSON.parse(items!);
  }

  getCartLength = () => {
    let items = this.getCartItem();
    return items ? this.getCartItem().length : 0;
  }

  getTotal = () => {
    let items = window.localStorage.getItem('shopping_cart');
    let shopping_items = JSON.parse(items!);
    let total = 0;

    shopping_items.forEach((product: any) => {
      let price = product.price * product.selectedQuantity 
      total += price;
    });

    return total;
  }


  deleteProduct = (product: Product) => {
    let items = this.getCartItem();

    if (items) {
      const deleteditem = items.find((item: any) => {
        return item.id === product.id;
      });
      if (deleteditem) {
        let index = items.indexOf(deleteditem);
        items.splice(index, 1);
        window.localStorage.setItem('shopping_cart', JSON.stringify(items));
        this.getTotal();
        this.getCartLength();
      }
    }
  }

  editCartItem = (product: Product) => {
    let items = this.getCartItem();

    if(items) {
      const item = items.find((item: any) => {
        return item.id === product.id
      });

      if(item) {
        let index = items.indexOf(item);
        items[index] = product;
        window.localStorage.setItem('shopping_cart', JSON.stringify(items));
      }
    }
  }

  getShippingMethods(): Observable<any> {
    return this._http.get(this.pathAPI)
  }
}

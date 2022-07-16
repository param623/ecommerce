import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartItemsService } from 'src/app/services/shopping-cart-items.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any = [];
  shippingMethods: any = [];
  selectedShippingMethod: any = []
  total: number = 0
  constructor(
    public _shoppingCartItemsService: ShoppingCartItemsService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.getItems();
    this.getShippingMethods();
    this.total = this._shoppingCartItemsService.getTotal();
  }

  getItems() {
    this.cartItems = this._shoppingCartItemsService.getCartItem();
    if(this.cartItems) {
    }
  }

  getShippingMethods() {
    this._shoppingCartItemsService.getShippingMethods().subscribe( res => {
      this.shippingMethods = res;
    });
  }

  updateValue(value: string) {
    this.total = this._shoppingCartItemsService.getTotal();
    this.total += +value;
  }

  back() {
    this._route.navigate(['']);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartItemsService } from 'src/app/services/shopping-cart-items.service';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.css']
})
export class CheckoutProductComponent implements OnInit {

  @Input() checkout_products: Product[] = [];
  quantity: number = 0
  constructor(
    private _shoppingCartItemsService : ShoppingCartItemsService
  ) { }

  ngOnInit(): void {
  }

  getItem() {
    this.checkout_products = this._shoppingCartItemsService.getCartItem();
  }

  deleteProduct (product : Product) {
    this._shoppingCartItemsService.deleteProduct(product);
    this.checkout_products = this._shoppingCartItemsService.getCartItem();
  }

  chkQuantity(product: Product, action: string) {
    let editedproduct: Product = product
    if( action == 'add' && ( (product.selectedQuantity + 1) != product.stock ) ) {
      editedproduct.selectedQuantity += 1;
      editedproduct.stock -= 1
    } else if( action == 'minus' && (product.stock != 0) ) {
      if(product.selectedQuantity == 1) {
        alert(" Quantity Can't be Zero. ")
      } else {
        editedproduct.selectedQuantity -= 1;
        editedproduct.stock += 1
      }
    }

    this._shoppingCartItemsService.editCartItem(editedproduct);
    this.getItem();
  }
}

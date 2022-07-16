import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartItemsService } from 'src/app/services/shopping-cart-items.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchValue: string = ''
  cartItems: number = 0;
  constructor(
    private _route: Router,
    public _shoppingCartItemsService: ShoppingCartItemsService,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  landingPage() {
    this._route.navigate(['']);
  }

  cartPage() {
    this._route.navigate(['checkout']);
  }

  filterProducts() {
    this._productService.filterProduct(this.searchValue).subscribe( res =>{
      this._productService.updateProduct.emit(res);
    }, err => {
      alert("Not Found");
    });
  }

}

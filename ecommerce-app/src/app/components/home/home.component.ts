import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ShoppingCartItemsService } from 'src/app/services/shopping-cart-items.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: any = ["landing_1", "landing_2", "landing_3", "landing_4", "landing_5", "landing_6", "landing_7", "landing_8"];
  products!: Product[];
  selectedProduct!: Product;
  userId?: string | null
  showProductDetailPage: boolean = false;
  constructor(
    private _route: Router,
    private _shoppingCartItemsService: ShoppingCartItemsService,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this._productService.updateProduct.subscribe( ( res) => {
      this.products = res;
    });
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(res => {
      this.products = res;
      console.log(this.products);
    }, err => {
      console.log("Something went wrong.")
    });
  }

  productDetail(product: Product) {
    this._route.navigate(['product', product.id])
  }

  addToCart(product: Product) {
    this._shoppingCartItemsService.addCartItem(product);
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartItemsService } from 'src/app/services/shopping-cart-items.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  selectedProduct!: Product
  currentImage: string = '';
  currentMRP: number = 0;
  discountPrice: number = 0;
  shoppingCartItems: Product[] = [];
  constructor(
    private _productService: ProductService,
    private _route: Router,
    private _shoppingCartItemsService: ShoppingCartItemsService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.scrollTop();
    this._activatedRoute.paramMap.subscribe(param => {
      let productId = param.get('id');
      if (productId) {
        let id = +productId
        this.getProductById(id);
      }
    });
  }

  priceCalculation() {
    this.currentImage = this.selectedProduct.images[0];

    this.currentMRP = this.selectedProduct.price + ((this.selectedProduct.price * this.selectedProduct.discountPercentage) / 100);
    this.currentMRP = +this.currentMRP.toFixed(2);

    this.discountPrice = this.currentMRP - this.selectedProduct.price;
    this.discountPrice = +this.discountPrice.toFixed(2);
  }

  onHoverImage(image: string) {
    this.currentImage = image;
  }

  getProductById(id: number) {
    this._productService.getProductById(id).subscribe(res => {
      this.selectedProduct = res;
      this.priceCalculation();
    });
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  addToCart() {
    this._shoppingCartItemsService.addCartItem(this.selectedProduct);
    this._route.navigate(['checkout']);
  }


  back() {
    this._location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CART_KEY } from 'src/app/constants';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductService } from 'src/app/services/product.service';
import { changeQuantilyCart } from '../../store/cart/cart.action'

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product!: Product
  sizeList: number[] = [36, 37, 38, 39, 40, 41, 42]
  cartList!: CartItem[]
  
  imageSelected!: string
  sizeSelected!: number
  quantily: number = 1
  rating!: number


  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.getProduct()
    window.scrollTo(0, 0)  
  }

  getProduct() {
    let id = this.route.snapshot.paramMap.get('id')
    this.productService.getProduct(id).subscribe(res => {
      this.product = res.data as Product
      this.handleCalcRating(this.product.reviews)
      this.imageSelected = this.product.images.image_1
    })
  }

  handleChangeImage(event: any) {
    this.imageSelected = event.target.src
  }

  handleChooseSize(size: number) {
    this.sizeSelected = size
  }

  handleCalcPrice(price: number, discount?: number) {
    let originPrice = this.productService.calcPriceDiscount(price, discount ? discount : null)
    return this.productService.formatVND(originPrice)
  }

  handleCalcRating(reviews: Review[]) {
    if(reviews.length === 0 || !reviews) {
      this.rating = 5
    }
    else {
      const ratingTotal = reviews.reduce((total, cur) => total += cur.rating , 0)
      this.rating = parseInt((ratingTotal / reviews.length).toFixed())
    }  

    return this.rating
  }

  handleReviewsChange(reviews: Review[]): void {
    // UPDATE RATING IN LOCAL STORAGE AFTER ADD REVIEW
    this.cartList = this.productService.getCartListStorage()
    
    const updatedRating = this.handleCalcRating(reviews)

    this.cartList = this.cartList?.map((item: any) => {
      if(item._id === this.product._id) {
        item.rating = updatedRating
      }
      
      return item
    })

    localStorage.setItem(CART_KEY, JSON.stringify(this.cartList))
  }

  hanldeAddToCart() {
    this.cartList = this.productService.getCartListStorage()
    const product = this.cartList.find(item => item._id === this.product._id && item.size === this.sizeSelected)
    
    let newCarts
    if(product) {
      newCarts = this.cartList.map(item => {
        if(item._id === product._id && item.size === this.sizeSelected) {
          item.quantily += this.quantily
        }

        return item
      })
    }
    else {
      let newProduct = {
        ...this.product, 
        size: this.sizeSelected,
        quantily: this.quantily,
        originPrice: this.product.discount ? this.productService.calcPriceDiscount(this.product.price, this.product.discount) : this.product.price,
        rating: this.handleCalcRating(this.product.reviews)
      }

      newCarts = [...this.cartList, newProduct]
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(newCarts))
    this.store.dispatch(changeQuantilyCart({ count: this.quantily }))

    this.sizeSelected = 0
    this.quantily = 1

    this.productService.displayMessage('Added to cart', 'Successfully')
  }
}
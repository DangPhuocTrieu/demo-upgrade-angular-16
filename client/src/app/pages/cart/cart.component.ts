import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { CART_KEY } from 'src/app/constants';
import { CartItem } from 'src/app/models/cartItem';
import { ProductService } from 'src/app/services/product.service';
import { changeQuantilyCart } from 'src/app/store/cart/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  columns: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' },
    { field: 'reviews', header: 'Reviews' },
    { field: 'quantily', header: 'Quantily' },
    { field: 'size', header: 'Size' },
    { field: 'total', header: 'Total' }
  ]

  cartList!: CartItem[]
  cartListTemp!: CartItem[]
  productsSelected: CartItem[] = []
  searchValue: string = ''

  constructor(
    private productService: ProductService, 
    public confirmationService: ConfirmationService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.cartList = []
    this.cartList = this.productService.getCartListStorage()
    this.cartListTemp = this.cartList
  }

  formatPrice(price: number): string {
    return this.productService.formatVND(price)
  }

  handleTotalPrice(): string {
    return this.formatPrice(this.cartList?.reduce((total, cur) => total += cur.originPrice * cur.quantily , 0))
  }

  handleChangeQuantily(type: string, id: string, size: number , newQuantily: number): CartItem[] | void {
    if(newQuantily > 0) {
      this.cartList = this.cartList.map(item => {
        if(item._id === id && item.size === size) {
          item.quantily = newQuantily
        }
  
        return item
      })

      this.store.dispatch(changeQuantilyCart({ count: type === 'increase' ? 1: -1 }))
      localStorage.setItem(CART_KEY, JSON.stringify(this.cartList))
    }
  }
  
  handleDelete(id: string, size: number): void { 
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {   
        let product = this.cartList.find(item => item._id === id && item.size === size)
        this.store.dispatch(changeQuantilyCart({ count: -(product?.quantily as number) }))
        
        this.cartList = this.cartList.filter(item => (item._id === id && item.size !== size) || item._id !== id)
        localStorage.setItem(CART_KEY, JSON.stringify(this.cartList))

        this.productService.displayMessage('Deleted product', 'Successfully')        
      }
    })
  }

  handleMultipleDelete(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete select products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {   
        this.productsSelected.map(item => {
          this.cartList = this.cartList.filter(x => {
            return (item._id === x._id && item.size !== x.size) || item._id !== x._id
          })
        })

        localStorage.setItem(CART_KEY, JSON.stringify(this.cartList))
    
        this.productService.displayMessage('Deleted selected products', 'Successfully')
      }
    })
  }

  handleSearchChange(): void {
    this.cartList = this.cartListTemp.filter(item => item.name.toLowerCase().includes(this.searchValue.toLowerCase()))
  }

  handlePayment(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to pay for all products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {   
        localStorage.removeItem(CART_KEY)  
        this.cartList = []

        this.productService.displayMessage('Successful payment', 'Successfully')
      }
    })
  }
}

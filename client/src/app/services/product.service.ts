import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CART_KEY } from '../constants';
import { CartItem } from '../models/cartItem';
import { DataServer } from '../models/data';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = 'http://localhost:8000/api/product'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProducts(): Observable<DataServer> {
    return this.http.get<DataServer>(this.BASE_URL)
  }

  getProduct(id: string | null): Observable<DataServer> {
    return this.http.get<DataServer>(`${this.BASE_URL}/${id}`)
  }

  addReview(id: string, data: any): Observable<DataServer> {
    return this.http.post<DataServer>(`${this.BASE_URL}/review/${id}`, data )
  }

  formatVND(price: number): string {
    return price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
  }

  calcPriceDiscount(price: number, discount: number | null): number {
    if(discount) {
      return price - (price / 100 * discount)
    }
    else {
      return price
    }
  }

  getCartListStorage(): CartItem[] {
    const cartsJSON: any = localStorage.getItem(CART_KEY)
    return cartsJSON !== null ? JSON.parse(cartsJSON) : []
  }

  displayMessage(detail: string,summary?: string, severity: string = 'success'): void {
    this.messageService.add({ severity, summary, detail })
  }

  // ADMIN
  addProduct(data: Product): Observable<DataServer> {
    return this.http.post<DataServer>(this.BASE_URL, data)
  }

  editProduct(id: string, data: Product): Observable<DataServer> {
    return this.http.put<DataServer>(`${this.BASE_URL}/${id}`, data)
  }

  deleteProduct(id: string): Observable<DataServer> {
    return this.http.delete<DataServer>(`${this.BASE_URL}/${id}`)
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>('https://api.cloudinary.com/v1_1/ddwurilrw/image/upload', formData)
  }
}

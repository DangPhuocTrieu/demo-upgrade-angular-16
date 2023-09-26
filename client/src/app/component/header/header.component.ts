import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartState } from 'src/app/store/cart/cart.reducer';
import { USER_KEY } from '../../constants/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$!: Observable<CartState>
  cartsTotal!: number
  user!: User | null

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store<{ cart: CartState }>
    ) {
      this.cart$ = store.pipe(select('cart'))
    }
  ngOnInit(): void {
    this.user = this.authService.getUserStorage()
    this.cart$.subscribe(state => this.cartsTotal = state.count)
  }

  handleLogout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.removeItem(USER_KEY)
        this.user = null

        this.messageService.add({severity:'success', summary:'Confirmed', detail:'Log out successfully'});
      }
    })
  }
}

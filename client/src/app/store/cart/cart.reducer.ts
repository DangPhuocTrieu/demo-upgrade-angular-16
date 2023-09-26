import { Action, createReducer, on } from '@ngrx/store';
import { CART_KEY } from 'src/app/constants';
import * as CartActions from './cart.action';
import { CartItem } from '../../models/cartItem';

const cartsJSON: any = localStorage.getItem(CART_KEY)
const carts: CartItem[] = JSON.parse(cartsJSON) 
let cartsTotal: number = Array.isArray(carts) ? carts.reduce((total, cur) => total += cur.quantily , 0) : 0

export interface CartState {
    count: number
}

export const initState: CartState = {
    count: cartsTotal
}

const _cartReducer = createReducer(
    initState,
    on(CartActions.changeQuantilyCart, (state, payload) => {
        cartsTotal += payload.count
        return { ...state, count: cartsTotal }
    })
)

export function cartReducer(state: any, action: Action) {
    return _cartReducer(state, action);
  }
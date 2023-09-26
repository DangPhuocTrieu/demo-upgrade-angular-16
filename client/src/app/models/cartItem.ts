import { Product } from "./product";

interface Info {
    quantily: number,
    size: number,
    originPrice: number
    rating: number
}

export interface CartItem extends Product, Info {}
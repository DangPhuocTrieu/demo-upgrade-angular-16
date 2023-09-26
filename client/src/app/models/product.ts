import { Review } from "./review";

export interface Product {
    _id: string;
    name: string;
    description: string;
    discount?: number;
    price: number;
    images: {
        image_1: string,
        image_2: string,
        image_3: string,
    },
    reviews: Review[]
}

import { Product } from "./product";
import { User } from "./user";

export interface DataServer {
    success: boolean;
    status?: string;
    message: string;
    data?: Product[] | Product | User
}
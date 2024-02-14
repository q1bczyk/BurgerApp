import { ProductInterface } from "../../models/product.interface";

export interface CartInterface
{
    isCartVisible : boolean;
    isDelivery : boolean;
    price : number;
    productsQuantity : number;
    products : ProductInterface[];
}

export const initialState : CartInterface = 
{
    isCartVisible: false,
    isDelivery: false,
    price: 0,
    productsQuantity: 0,
    products : [],
}
import { ProductInterface } from "../../models/product.interface";

export interface CartInterface
{
    isCartVisible : boolean;
    isDelivery : boolean;
    price : number;
    products : ProductInterface[];
}

export const initialState : CartInterface = 
{
    isCartVisible: false,
    isDelivery: false,
    price: 0,
    products : [],
}
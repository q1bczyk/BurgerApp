import { OrderDetailsInterface } from "src/app/shared/models/order-details.interface";
import { ProductInterface } from "src/app/shared/models/product.interface";

export interface OrderDetailsIdInterface extends OrderDetailsInterface
{
    id : string;
    products : ProductInterface[];
    price : number;
    orderStatus : string,
}
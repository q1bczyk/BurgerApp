import { ClientContactInterface } from "./client-contact.interface";

export interface OrderRequestInterface
{
    price : number;
    isPaymentOnline : boolean;
    products : OrderProducts[],
    clientsContact : ClientContactInterface,
    localId : string,
}

export interface OrderProducts  
{
    productId : string,
    quantity : number,
}
import { ClientContactInterface, DeliveryDetailsInterface } from "./client-contact.interface"

export interface OrderDetailsInterface
{
    id : string,
    orderStatus : string,
    waitingTime? : string,
    refusalReason? : string,
    clientsContact : ClientContactInterface,
    localId : string,
}
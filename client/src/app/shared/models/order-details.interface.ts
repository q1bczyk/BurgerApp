import { ClientContactInterface, DeliveryDetailsInterface } from "./client-contact.interface"

export interface OrderDetailsInterface
{
    orderStatus : string,
    waitingTime? : string,
    refusalReason? : string,
    clientsContact : ClientContactInterface
}
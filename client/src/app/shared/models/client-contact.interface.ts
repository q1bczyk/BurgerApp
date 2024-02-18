export interface ClientContactInterface
{
    name : string,
    lastname : string,
    email : string,
    phoneNumber : string,
    deliveryDetails? : DeliveryDetailsInterface | null;
}

export interface DeliveryDetailsInterface 
{
    city : string,
    postalCode : string,
    street : string,
    houseNumber : string,
}
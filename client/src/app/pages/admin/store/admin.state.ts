import { LocalInterface } from "src/app/shared/models/local.interface";

export const initialState : LocalInterface =
{
    id : '',
    name : '',
    slug : '',
    contact : 
    {
        city : '',
        postalCode : '',
        street : '',
        streetNumber : '',
        email : '',
        phoneNumber : '',
    },
    openingHours : [],
    dayOffs : [],
}


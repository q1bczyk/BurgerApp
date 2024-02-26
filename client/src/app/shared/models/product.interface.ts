import { IngredientInterface } from "src/app/pages/admin/shared/models/ingredient.interface";

export interface ProductInterface
{
    id : string;
    price : number;
    name : string;
    type : string;
    quantity : number;
    imgUrl : string;
    ingredients : IngredientInterface[];
}
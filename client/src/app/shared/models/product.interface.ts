import { IngredientResponseInterface } from "./ingredient-response.interface";

export interface ProductInterface
{
    id : string;
    price : number;
    name : string;
    type : string;
    imgUrl : string;
    ingredients : IngredientResponseInterface[];
}
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IngredientInterface } from "../../shared/models/ingredient.interface";

@Injectable()
export class IngredientsPageResolver implements Resolve<IngredientInterface | null>
{
    constructor(private productService : ProductService, private router : Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IngredientInterface | Observable<IngredientInterface | null> | Promise<IngredientInterface | null> | null 
    {
        
    }

   
    
}
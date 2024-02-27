import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { ProductInterface } from "src/app/shared/models/product.interface";
import { ProductService } from "src/app/shared/services/product.service";
import { IngredientInterface } from "../../shared/models/ingredient.interface";
import { IngredientService } from "../ingredients-page/services/ingredients-page.service";

@Injectable()
export class EditIngredientResolver implements Resolve<IngredientInterface | null>
{
    constructor(private ingredientService : IngredientService, private router : Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IngredientInterface | Observable<IngredientInterface | null> | Promise<IngredientInterface | null> | null 
    {
        return this.ingredientService.fetchIngredient(route.params['ingredientId'])
            .pipe(
                catchError(err => {
                    this.router.navigate(['not-found'])
                    return of(null);
                })
            )
    }

   
    
}
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { IngredientInterface } from "../../shared/models/ingredient.interface";
import { IngredientService } from "./services/ingredients-page.service";

@Injectable({
    providedIn: 'root'
})
export class IngredientsPageResolver implements Resolve<IngredientInterface[] | null>
{
    constructor(private ingredientService : IngredientService, private router : Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IngredientInterface[] | Observable<IngredientInterface[] | null> | Promise<IngredientInterface[] | null> | null 
    {
        return this.ingredientService.fetchIngredients()
            .pipe(
                catchError(err => {
                    this.router.navigate(['not-found'])
                    return of(null)
                })
            )
    }

   
    
}
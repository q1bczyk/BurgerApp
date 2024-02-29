import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BaseApiService } from "src/app/shared/services/base-api.service";
import { IngredientInterface } from "../models/ingredient.interface";

@Injectable({
    providedIn: 'root'
})

export class IngredientsService extends BaseApiService
{
    url : string = this.baseUrl + 'ingredient'

    fetchIngredients() : Observable<IngredientInterface[]>
    {
        return this.http.get<IngredientInterface[]>(this.url, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    deleteIngredient(ingredientId : string) : Observable<{message : string}>
    {
        return this.http.delete<{message : string}>(`${this.url}/${ingredientId}`, { headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res
                })
            )
    }

    fetchIngredient(ingredientId : string) : Observable<IngredientInterface>
    {
        return this.http.get<IngredientInterface>(`${this.url}/${ingredientId}`, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res
                })
            )
    }

    editIngredient(ingredient : IngredientInterface) : Observable<IngredientInterface>
    {
        return this.http.put<IngredientInterface>(`${this.url}/${ingredient.id}`, ingredient, {headers : this.setHeaders()})
            .pipe(
                map(res => {
                    return res
                })
            )
    }

}

import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BaseApiService } from "src/app/shared/services/base-api.service";
import { IngredientInterface } from "../../../shared/models/ingredient.interface";

@Injectable({
    providedIn: 'root'
})
export class IngredientService extends BaseApiService
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
}
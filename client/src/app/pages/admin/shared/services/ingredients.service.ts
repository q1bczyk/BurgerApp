import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IngredientInterface } from "../models/ingredient.interface";

@Injectable({
    providedIn: 'root'
})

export class IngredientsService
{
    url : string = "https://localhost:5001/api/ingredient";

    constructor(private http : HttpClient){}

    fetchIngredients() : Observable<IngredientInterface[]>
    {
        const headers : HttpHeaders = this.setHeaders();

        return this.http.get<IngredientInterface[]>(this.url, {headers : headers})
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    private setHeaders() : HttpHeaders
    {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    } 
}

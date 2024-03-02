import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { ProductService } from "src/app/shared/services/product.service";
import { RankingProductInterface } from "../../shared/models/ranking-product.interface";

@Injectable()
export class RankingResolver implements Resolve<RankingProductInterface[] | null>
{
    constructor(private productService : ProductService, private router : Router, private title : Title)
    {
        const dataToParse = localStorage.getItem('activeAdminData');
        if(dataToParse)
        {
            const data = JSON.parse(dataToParse);
            this.title.setTitle(`${data.name} | Ranking`);
        }
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RankingProductInterface[] | Observable<RankingProductInterface[] | null> | Promise<RankingProductInterface[] | null> | null 
    {
        return this.productService.getRanking()
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(err => {
                    this.router.navigate(['not-found'])
                    return of(null);
                })    
            )
    }
    
}
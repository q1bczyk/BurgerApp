import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { ProductInterface } from "src/app/shared/models/product.interface";
import { ProductService } from "src/app/shared/services/product.service";

@Injectable()
export class MenuResolver implements Resolve<ProductInterface[] | null>
{
    constructor(private productServie : ProductService, private router : Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductInterface[] | Observable<ProductInterface[] | null> | Promise<ProductInterface[] | ProductInterface[]> 
    {
        return this.productServie.GetProducts(route.queryParams['product-type'])
            .pipe(
                map(resData => {
                    return resData;
                }),
            )           
    }
}
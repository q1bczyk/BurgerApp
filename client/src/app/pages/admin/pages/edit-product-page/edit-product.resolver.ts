import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { ProductInterface } from "src/app/shared/models/product.interface";
import { ProductService } from "src/app/shared/services/product.service";

@Injectable()
export class EditProductResolver implements Resolve<ProductInterface | null>
{
    constructor(private productService : ProductService, private router : Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductInterface | Observable<ProductInterface | null> | Promise<ProductInterface | null> | null 
    {
        return this.productService.getProduct(route.params['productId'])
            .pipe(
                catchError(err => {
                    this.router.navigate(['not-found'])
                    return of(null);
                })
            )
    }
    
}
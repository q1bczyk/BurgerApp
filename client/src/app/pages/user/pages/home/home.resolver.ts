import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of} from "rxjs";
import { LocalInterface } from "src/app/shared/models/local.interface";
import { LocalService } from "../../services/local.service";

@Injectable()
export class HomeResolver implements Resolve<LocalInterface | null>
{
    constructor(private localService : LocalService, private router : Router)
    {
        if(localStorage.getItem('activeLocal') === null)
            this.router.navigate(['']);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): LocalInterface | Observable<LocalInterface | null> | Promise<LocalInterface | LocalInterface> 
    {
        return this.localService.FetchLocal(route.params['slug'])
            .pipe(
                map(resData => {
                    localStorage.setItem('activeLocal', JSON.stringify(resData));
                    return resData;
                }),
                catchError(err => {
                    this.router.navigate(['not-found']);
                    return of(null);
                })
            )           
    }
}
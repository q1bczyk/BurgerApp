import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { OpeningHourResponseInterface } from "src/app/shared/models/opening-hour-response.interface";
import { OpeningHoursService } from "../../shared/services/openingHours.service";

@Injectable()
export class OpeningHoursResolver implements Resolve<OpeningHourResponseInterface | null>
{
    constructor(private openingHoursSerivce : OpeningHoursService, private router : Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OpeningHourResponseInterface | Observable<OpeningHourResponseInterface | null> | Promise<OpeningHourResponseInterface | null> | null 
    {
        return this.openingHoursSerivce.fetchOpeningHour(route.params['openingHourId'])
            .pipe(
                catchError(err => {
                    console.log(err)
                    this.router.navigate(['not-found']);
                    return of(null);
                })
            )
    }
}
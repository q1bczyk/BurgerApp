import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    const expectedQueryParams = ['product-type'];

    const queryParams = state.root.firstChild?.queryParams;

    if (this.areExpectedQueryParamsPresent(queryParams, expectedQueryParams)) 
        return true;

    this.router.navigate(['not-found']);
    return false;
  }

  private areExpectedQueryParamsPresent(queryParams: any, expectedParams: string[]): boolean 
  {
    for (const param of expectedParams) 
    {
        if(!(param in queryParams) || queryParams[param] === '')
            return false;
    }
    return true;
  }
}